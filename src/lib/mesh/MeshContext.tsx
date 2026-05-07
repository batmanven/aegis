/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Peer, { DataConnection } from 'peerjs';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  type: 'chat' | 'sos' | 'system';
}

interface MeshContextType {
  peerId: string | null;
  connections: string[];
  messages: Message[];
  sendMessage: (text: string, type?: 'chat' | 'sos') => void;
  connectToPeer: (id: string) => void;
  status: 'connecting' | 'online' | 'offline';
}

const MeshContext = createContext<MeshContextType | undefined>(undefined);

export const MeshProvider = ({ children }: { children: React.ReactNode }) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [peerId, setPeerId] = useState<string | null>(null);
  const [connections, setConnections] = useState<Record<string, DataConnection>>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<'connecting' | 'online' | 'offline'>('offline');

  const handleConnection = useCallback((conn: DataConnection) => {
    conn.on('open', () => {
      setConnections(prev => ({ ...prev, [conn.peer]: conn }));
      setMessages(prev => [...prev, {
        id: uuidv4(),
        sender: 'System',
        text: `Connected to peer: ${conn.peer.slice(0, 8)}...`,
        timestamp: Date.now(),
        type: 'system'
      }]);
    });

    conn.on('data', (data: any) => {
      setMessages(prev => [...prev, data as Message]);
    });

    conn.on('close', () => {
      setConnections(prev => {
        const next = { ...prev };
        delete next[conn.peer];
        return next;
      });
    });
  }, []);

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on('open', (id) => {
      setPeerId(id);
      setStatus('online');
      console.log('Mesh ID established:', id);
    });

    newPeer.on('connection', (conn) => {
      handleConnection(conn);
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPeer(newPeer);

    return () => {
      newPeer.destroy();
    };
  }, [handleConnection]);

  const connectToPeer = useCallback((id: string) => {
    if (!peer || connections[id]) return;
    const conn = peer.connect(id);
    handleConnection(conn);
  }, [peer, connections, handleConnection]);

  const sendMessage = useCallback((text: string, type: 'chat' | 'sos' = 'chat') => {
    if (!peerId) return;

    const message: Message = {
      id: uuidv4(),
      sender: peerId,
      text,
      timestamp: Date.now(),
      type
    };

    setMessages(prev => [...prev, message]);

    Object.values(connections).forEach(conn => {
      conn.send(message);
    });
  }, [peerId, connections]);

  return (
    <MeshContext.Provider value={{
      peerId,
      connections: Object.keys(connections),
      messages,
      sendMessage,
      connectToPeer,
      status
    }}>
      {children}
    </MeshContext.Provider>
  );
};

export const useMesh = () => {
  const context = useContext(MeshContext);
  if (!context) throw new Error('useMesh must be used within MeshProvider');
  return context;
};
