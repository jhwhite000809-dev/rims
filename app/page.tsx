'use client';
import { useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('저장 중...');

    try {
      const res = await fetch('/api/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage('저장 완료! 🎉'); // 저장 성공 UI
        setTitle('');
        setContent('');
      } else {
        setStatusMessage('저장 실패 😢');
      }
    } catch (err) {
      setStatusMessage('오류가 발생했습니다.');
    }
  };

  return (
    <main style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>나만의 웹 다이어리</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Title: </label><br />
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>Content: </label><br />
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
            rows={5}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
          제출 (Submit)
        </button>
      </form>
      {statusMessage && <p style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '18px' }}>{statusMessage}</p>}
    </main>
  );
}