import { useSession } from '../contexts/useSession';

export type Category = {
  id: number;
  name: string;
};

export type Memo = {
  id: number;
  category?: number;
  title: string;
  content?: string;
};

export default function useApi() {
  const { accessToken } = useSession();

  const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-ACCESS-TOKEN': accessToken ?? '',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Error while fetching API (${res.status})${
          errorText ?? `: ${errorText}`
        }`
      );
    }

    return res.json();
  };

  const getMemos = async (categoryId: number): Promise<Memo[]> => {
    const params = new URLSearchParams({ category_id: categoryId.toString() });
    const res = await fetch(`${process.env.REACT_APP_API_URL}/memo?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-ACCESS-TOKEN': accessToken ?? '',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Error while fetching API (${res.status})${
          errorText ?? `: ${errorText}`
        }`
      );
    }

    return res.json();
  };

  const getMemo = async (memoId: number): Promise<Memo> => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/memo/${memoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-ACCESS-TOKEN': accessToken ?? '',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Error while fetching API (${res.status})${
          errorText ?? `: ${errorText}`
        }`
      );
    }

    return res.json();
  };

  const setMemo = async (
    memoId: number,
    categoryId: number,
    title: string,
    content: string
  ): Promise<Memo> => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/memo/${memoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-ACCESS-TOKEN': accessToken ?? '',
      },
      body: JSON.stringify({
        category_id: categoryId,
        title,
        // To avoid a 400 error returned by the API, we need to systematically send a non-empty string.
        content: content === '' ? ' ' : content,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Error while fetching API (${res.status})${
          errorText ?? `: ${errorText}`
        }`
      );
    }

    return res.json();
  };

  const addMemo = async (
    categoryId: number,
    title: string,
    content: string
  ): Promise<Memo> => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/memo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ACCESS-TOKEN': accessToken ?? '',
      },
      body: JSON.stringify({
        category_id: categoryId,
        title,
        content,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Error while fetching API (${res.status})${
          errorText ?? `: ${errorText}`
        }`
      );
    }

    return res.json();
  };

  const deleteMemo = async (memoId: number): Promise<boolean> => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/memo/${memoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-ACCESS-TOKEN': accessToken ?? '',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Error while fetching API (${res.status})${
          errorText ?? `: ${errorText}`
        }`
      );
    }

    return true;
  };

  return { getCategories, getMemos, getMemo, setMemo, addMemo, deleteMemo };
}
