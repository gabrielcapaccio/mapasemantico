"use client";

import { useApp } from './context/AppContext';
import ProfileCard from './components/ProfileCard';
import Link from 'next/link';
import { SwipeAction } from './types';

export default function Home() {
  const { users, currentIndex, handleSwipe, matches } = useApp();

  const currentUser = users[currentIndex];
  const hasMoreUsers = currentIndex < users.length;

  const onSwipe = (action: SwipeAction) => {
    handleSwipe(action);
  };

  const handleButtonSwipe = (action: SwipeAction) => {
    handleSwipe(action);
  };

  return (
    <div>
      <nav className="navbar">
        <h1>💕 DateApp</h1>
        <div className="nav-links">
          <Link href="/" className="active">Descubrir</Link>
          <Link href="/matches">Matches ({matches.length})</Link>
        </div>
      </nav>

      <div className="container">
        <div className="card-deck">
          {hasMoreUsers ? (
            <>
              <ProfileCard
                user={currentUser}
                onSwipe={onSwipe}
              />
              {currentIndex + 1 < users.length && (
                <ProfileCard
                  user={users[currentIndex + 1]}
                  onSwipe={() => {}}
                  style={{
                    zIndex: -1,
                    opacity: 0.5,
                    transform: 'scale(0.95)'
                  }}
                />
              )}
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">😢</div>
              <h2>No hay más personas cerca</h2>
              <p>Vuelve más tarde para ver nuevos perfiles</p>
            </div>
          )}
        </div>

        {hasMoreUsers && (
          <div className="action-buttons">
            <button
              className="btn btn-pass"
              onClick={() => handleButtonSwipe('pass')}
              title="Pasar"
            >
              ✕
            </button>
            <button
              className="btn btn-super-like"
              onClick={() => handleButtonSwipe('like')}
              title="Super Like"
            >
              ★
            </button>
            <button
              className="btn btn-like"
              onClick={() => handleButtonSwipe('like')}
              title="Me gusta"
            >
              ❤
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
