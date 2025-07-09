import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import useApi, { type Memo } from '../api/useApi';

export default function Memo({
  memoId,
  setMemoId,
  categoryId,
  setCategoryId,
  title,
  setTitle,
  content,
  setContent,
}: {
  memoId: number | null;
  setMemoId: React.Dispatch<React.SetStateAction<number | null>>;
  categoryId: number | null;
  setCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}) {
  const queryClient = useQueryClient();
  const { getMemo, setMemo, deleteMemo } = useApi();

  const { data: memo, isLoading } = useQuery({
    queryKey: ['memo', memoId],
    queryFn: () => getMemo(memoId ?? 0),
    retry: 1,
    enabled: !!memoId,
  });

  const { mutate: setMemoMutation, isPending: isSetMemoPending } = useMutation({
    mutationFn: () => setMemo(memoId ?? 0, categoryId ?? 0, title, content),
    onSuccess: () => {
      queryClient.setQueryData(['memo', memoId], {
        categoryId: categoryId ?? 0,
        title,
        content,
      });
      queryClient.setQueryData(['memos', categoryId], (old: Memo[]) =>
        old.map((memo) =>
          memo.id === memoId ? { ...memo, title, content } : memo
        )
      );
    },
  });

  const { mutate: deleteMemoMutation, isPending: isDeleteMemoPending } =
    useMutation({
      mutationFn: () => deleteMemo(memoId ?? 0),
      onSuccess: () => {
        setMemoId(null);
        setCategoryId(null);
        queryClient.setQueryData(['memos', categoryId], (old: Memo[]) =>
          old.filter((memo) => memo.id !== memoId)
        );
      },
    });

  useEffect(() => {
    if (memo) {
      setTitle(memo.title);
      setContent(memo.content ?? '');
    }

    return () => {
      setTitle('');
      setContent('');
    };
  }, [memo]);

  const handleSaveMemo = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setMemoMutation();
  };

  const handleDeleteMemo = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    deleteMemoMutation();
  };

  return (
    <FormControl
      sx={{
        flex: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: 250,
      }}
    >
      <TextField
        id='memo-title'
        disabled={
          !memoId || isLoading || isSetMemoPending || isDeleteMemoPending
        }
        variant='standard'
        label='Title'
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id='memo-content'
        disabled={
          !memoId || isLoading || isSetMemoPending || isDeleteMemoPending
        }
        variant='standard'
        label='Content'
        multiline
        sx={{
          '& .MuiInputBase-root textarea': {
            resize: 'vertical',
            lineHeight: '24px',
            minHeight: '120px',
            height: '120px',
          },
        }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button
          id='delete-memo'
          variant='text'
          disabled={!memoId}
          color='error'
          onClick={handleDeleteMemo}
          sx={{
            height: 35,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isLoading || isDeleteMemoPending ? (
            <CircularProgress size={20} color='error' />
          ) : (
            'DELETE'
          )}
        </Button>
        <Button
          id='save-memo'
          variant='text'
          disabled={!memoId}
          onClick={handleSaveMemo}
          sx={{
            height: 35,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isLoading || isSetMemoPending ? (
            <CircularProgress size={20} />
          ) : (
            'SAVE'
          )}
        </Button>
      </Box>
    </FormControl>
  );
}
