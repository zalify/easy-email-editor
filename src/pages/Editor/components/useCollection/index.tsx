import { Picture } from '@demo/components/Picture';
import { Message } from '@arco-design/web-react';
import { IBlockData } from 'easy-email-core';
import { CollectedBlock, IconFont } from 'easy-email-editor';
import { BlockMarketCategory, BlockMaskWrapper } from 'easy-email-extensions';

import React, { useCallback, useMemo } from 'react';
import { useLocalStorage } from 'react-use';

export const COLLECTION_KEY = 'COLLECTION_KEY';

const defaultData = [
  {
    title: 'Collection',
    name: 'Collection',
    blocks: [] as {
      id: string;
      title: string;
      description: string;
      thumbnail: string;
      data: IBlockData;
    }[],
  },
];

export function useCollection() {
  const [collection, setCollection] = useLocalStorage(
    COLLECTION_KEY,
    defaultData
  );

  const addCollection = useCallback(
    (payload: CollectedBlock) => {
      if (!collection) return;

      collection[0].blocks.push({
        id: payload.id,
        title: payload.label,
        description: payload.helpText,
        thumbnail: payload.thumbnail,
        data: payload.data,
      });
      setCollection([...collection]);
      Message.success('Added to collection!');
    },
    [collection, setCollection]
  );

  const removeCollection = useCallback(
    (id: string) => {
      if (!collection) return;

      collection[0].blocks = collection[0].blocks.filter(
        (item) => item.id !== id
      );
      setCollection([...collection]);
      Message.success('Remove collection');
    },
    [collection, setCollection]
  );

  const collectionCategory = useMemo((): BlockMarketCategory | null => {
    if (!collection) return null;
    const blockComponents = collection[0].blocks.map((item) => ({
      id: item.id,
      type: item.data.type,
      title: item.title,
      payload: item.data,
      description: item.description,
      thumbnail: item.thumbnail,
      component: () => (
        <BlockMaskWrapper
          key={item.id}
          type={item.data.type}
          payload={item.data}
        >
          <div style={{ position: 'relative' }}>
            <Picture src={item.thumbnail} />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
              }}
            />
            <div
              onClick={() => removeCollection(item.id)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                transform: 'translate(27px, 35px)',
                zIndex: 3,
              }}
            >
              <IconFont iconName='icon-delete' />
            </div>
          </div>
        </BlockMaskWrapper>
      ),
    }));

    return {
      title: 'Collection',
      name: 'Collection',
      blocks: blockComponents,
    };
  }, [collection, removeCollection]);

  return {
    removeCollection,
    addCollection,
    collectionCategory,
  };
}
