import {
  QueryClientProvider as QCP,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import App from '../App';
import withSnackbar from '../helpers/with-snackbar';

function QueryClientProvider({
  showSnackbar,
}: {
  showSnackbar: (message: string) => void;
}) {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error) => {
        showSnackbar(error.message);
      },
    }),
  });

  return (
    <QCP client={queryClient}>
      <App />
    </QCP>
  );
}

const WrappedQueryClientProvider = withSnackbar(QueryClientProvider);

export default WrappedQueryClientProvider;
