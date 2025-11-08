"use client";

import { useState, useRef } from 'react';
import { User, SwipeAction } from '../types';

interface ProfileCardProps {
  user: User;
  onSwipe: (action: SwipeAction) => void;
  style?: React.CSSProperties;
}

export default function ProfileCard({ user, onSwipe, style }: ProfileCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartPos({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const newX = clientX - startPos.x;
    const newY = clientY - startPos.y;
    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // If dragged more than 100px, swipe
    if (Math.abs(position.x) > 100) {
      const action: SwipeAction = position.x > 0 ? 'like' : 'pass';
      onSwipe(action);
    } else {
      // Return to center
      setPosition({ x: 0, y: 0 });
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const rotation = position.x * 0.05;
  const opacity = 1 - Math.abs(position.x) / 500;

  return (
    <div
      ref={cardRef}
      className="profile-card"
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        opacity,
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging ? 'none' : 'all 0.3s ease-out',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="card-image" style={{ backgroundImage: `url(${user.photos[0]})` }}>
        <div className="card-overlay">
          {position.x > 30 && (
            <div className="like-badge">❤️ ME GUSTA</div>
          )}
          {position.x < -30 && (
            <div className="pass-badge">✕ PASAR</div>
          )}
        </div>
      </div>

      <div className="card-info">
        <h2>{user.name}, {user.age}</h2>
        <p className="location">📍 {user.location}</p>
        <p className="bio">{user.bio}</p>
        <div className="interests">
          {user.interests.map((interest, i) => (
            <span key={i} className="interest-tag">{interest}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
