import Description from '@mui/icons-material/Description';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useApi, { type Category, type Memo } from '../api/useApi';
import { useSession } from '../contexts/useSession';

const CustomListItemButton = styled(ListItemButton)(() => ({
  borderRadius: 5,
}));

function Sidebar({
  memoId,
  setMemoId,
  categoryId,
  setCategoryId,
  open,
  setOpen,
}: {
  memoId: number | null;
  setMemoId: React.Dispatch<React.SetStateAction<number | null>>;
  categoryId: number | null;
  setCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  open: number | null;
  setOpen: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const { getCategories, getMemos } = useApi();
  const { sessionStatus } = useSession();
  const queryClient = useQueryClient();
  const { addMemo } = useApi();

  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ['categories'],
    queryFn: getCategories,
    retry: 1,
    enabled: sessionStatus,
  });

  const { data: memos, isLoading: isMemosLoading } = useQuery<Memo[]>({
    queryKey: ['memos', open],
    queryFn: () => getMemos(open ?? 0),
    retry: 1,
    enabled: !!open,
  });

  const { mutate: addMemoMutation, isPending: isAddMemoPending } = useMutation({
    mutationFn: () => addMemo(open ?? 0, 'New Memo', ''),
    onSuccess: (result) => {
      setMemoId(result.id);
      setCategoryId(open ?? 0);
      queryClient.setQueryData(['memo', result.id], {
        categoryId: open ?? 0,
        title: result.title,
        content: result.content ?? '',
      });
      queryClient.setQueryData(['memos', open], (old: Memo[]) => [
        ...old,
        result,
      ]);
    },
  });

  const handleCategoryClick = (id: number) => {
    setOpen((prev) => (prev === id ? null : id));
  };

  const handleAddMemo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    addMemoMutation();
  };

  return (
    <Paper
      sx={{
        width: '100%',
        height: 'fit-content',
        minHeight: 100,
        maxWidth: 360,
        p: 1,
      }}
    >
      <List
        component='nav'
        aria-labelledby='categories'
        subheader={
          <ListSubheader component='div' id='categories'>
            Categories
          </ListSubheader>
        }
      >
        {isCategoriesLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              py: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!isCategoriesLoading && categories?.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              py: 2,
            }}
          >
            <Typography variant='subtitle1'>Empty</Typography>
          </Box>
        )}
        {!sessionStatus && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              py: 2,
            }}
          >
            <Typography variant='subtitle1'>
              Please log in to view your memos
            </Typography>
          </Box>
        )}
        {sessionStatus &&
          !isCategoriesLoading &&
          categories &&
          categories?.length > 0 &&
          !isCategoriesLoading &&
          categories?.map((category) => (
            <Fade in={true} key={category.id}>
              <div id={`category-${category.id}`}>
                <CustomListItemButton
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <ListItemIcon>
                    {open === category.id ? (
                      isMemosLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <FolderOpenIcon />
                      )
                    ) : (
                      <FolderIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    id={`category-${category.id}-title`}
                    primary={category.name}
                    sx={{
                      '&>span': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      },
                    }}
                  />
                  {categoryId === category.id && categoryId !== open && (
                    <Box
                      sx={{
                        borderRadius: '100%',
                        backgroundColor: 'primary.main',
                        minHeight: 10,
                        minWidth: 10,
                        ml: 1,
                      }}
                    />
                  )}
                </CustomListItemButton>
                <Collapse
                  in={open === category.id}
                  timeout='auto'
                  unmountOnExit
                >
                  <List component='div' disablePadding>
                    {memos?.map((memo) => (
                      <CustomListItemButton
                        id={`memo-${memo.id}`}
                        key={memo.id}
                        selected={memoId === memo.id}
                        onClick={() => {
                          setMemoId((prev) => {
                            if (prev === memo.id) {
                              setCategoryId(null);
                              return null;
                            } else {
                              setCategoryId(category.id);
                              return memo.id;
                            }
                          });
                        }}
                        sx={{
                          pl: 4,
                          '&.Mui-selected': { color: 'primary.main' },
                        }}
                      >
                        <ListItemIcon>
                          {memoId === memo.id ? (
                            <Description sx={{ color: 'primary.main' }} />
                          ) : (
                            <DescriptionOutlinedIcon />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={memo.title}
                          sx={{
                            '&>span': {
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            },
                          }}
                        />
                      </CustomListItemButton>
                    ))}
                  </List>
                </Collapse>
              </div>
            </Fade>
          ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          id='new-memo'
          variant='text'
          disabled={!open}
          onClick={handleAddMemo}
          sx={{
            height: 35,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isAddMemoPending ? <CircularProgress size={20} /> : 'NEW'}
        </Button>
      </Box>
    </Paper>
  );
}

export default Sidebar;
