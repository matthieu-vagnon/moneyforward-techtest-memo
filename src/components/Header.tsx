import { Box, Button, Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSession } from '../contexts/useSession';
import { theme } from '../theme';

export default function Header() {
  const [tempToken, setTempToken] = useState('');
  const [valid, setValid] = useState(true);
  const { sessionStatus, setSessionStatus, setAccessToken } = useSession();

  // Generate a random valid UUID for the access token.
  const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .split('')
      .map((c) => {
        switch (c) {
          case 'x':
            return ((Math.random() * 16) | 0).toString(16);
          case 'y':
            return (((Math.random() * 4) | 0) + 8).toString(16);
          default:
            return c;
        }
      })
      .join('');
  };

  const handleTokenValidation = (token: string) => {
    const reg = new RegExp(
      '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    );

    if (!token) setValid(true);
    else setValid(reg.test(token));
  };

  useEffect(() => {
    setTempToken(uuid());
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          pt: 1.5,
          pb: 3,
        }}
      >
        <Container
          maxWidth='desktop'
          sx={{
            display: 'flex',
            alignItems: 'end',
            columnGap: 2,
            position: 'relative',
          }}
        >
          <TextField
            id='access_token'
            type='text'
            value={tempToken}
            color='secondary'
            onChange={(e) => {
              setTempToken(e.target.value);
              handleTokenValidation(e.target.value);
            }}
            error={!valid}
            disabled={sessionStatus}
            variant='standard'
            label='Access Token'
            fullWidth
            slotProps={{
              inputLabel: {
                sx: {
                  color: 'secondary.contrastText',
                },
              },
              input: {
                sx: {
                  color: 'primary.contrastText',
                },
              },
            }}
            sx={{
              '& .MuiInputBase-root:not(.Mui-disabled)': {
                '&::before': {
                  borderColor: `${theme.palette.secondary.contrastText} !important`,
                },
              },
            }}
          />
          <Button
            id='login'
            disabled={!valid || !tempToken || sessionStatus}
            onClick={() => {
              if (valid && tempToken) {
                setSessionStatus(true);
                setAccessToken(tempToken);
              }
            }}
            variant='text'
            color='inherit'
            sx={{
              flex: 'none',
            }}
          >
            {sessionStatus
              ? 'Logged in'
              : valid
              ? 'Login'
              : 'Invalid token format'}
          </Button>
        </Container>
      </Box>
    </>
  );
}
