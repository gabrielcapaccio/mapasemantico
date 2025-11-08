"use client";

import { useApp } from '../context/AppContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MatchesPage() {
  const { matches, getMatchedUsers } = useApp();
  const router = useRouter();
  const matchedUsers = getMatchedUsers();

  const handleMatchClick = (matchId: string, userId: string) => {
    router.push(`/chat/${matchId}`);
  };

  return (
    <div>
      <nav className="navbar">
        <h1>💕 DateApp</h1>
        <div className="nav-links">
          <Link href="/">Descubrir</Link>
          <Link href="/matches" className="active">Matches ({matches.length})</Link>
        </div>
      </nav>

      <div className="container">
        <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '2rem' }}>
          Tus Matches
        </h2>

        {matchedUsers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💔</div>
            <h2>Aún no tienes matches</h2>
            <p>¡Desliza a la derecha para encontrar tu match perfecto!</p>
            <Link href="/" style={{
              display: 'inline-block',
              marginTop: '2rem',
              padding: '1rem 2rem',
              background: 'var(--primary-color)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '600'
            }}>
              Empezar a explorar
            </Link>
          </div>
        ) : (
          <div className="matches-grid">
            {matchedUsers.map((user, index) => {
              const match = matches[index];
              return (
                <div
                  key={user.id}
                  className="match-card"
                  onClick={() => handleMatchClick(match.id, user.id)}
                >
                  <div
                    className="match-image"
                    style={{ backgroundImage: `url(${user.photos[0]})` }}
                  />
                  <div className="match-info">
                    <h3>{user.name}</h3>
                    <p>{user.age} años</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
