import { Container } from '@mui/material';
import { useState } from 'react';
import Header from './components/Header';
import Memo from './components/Memo';
import Sidebar from './components/Sidebar';
import './index.css';

function App() {
  // Sidebar props.
  const [open, setOpen] = useState<number | null>(null);
  // Memo props.
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // Global props.
  const [memoId, setMemoId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  return (
    <>
      <Header />
      <Container
        maxWidth='desktop'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          py: 3,
          flexWrap: 'wrap',
        }}
      >
        <Sidebar
          memoId={memoId}
          setMemoId={setMemoId}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          open={open}
          setOpen={setOpen}
        />
        <Memo
          memoId={memoId}
          setMemoId={setMemoId}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />
      </Container>
    </>
  );
}

export default App;
