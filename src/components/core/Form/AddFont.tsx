import { FieldArray } from 'formik';
import React from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { TextField } from '.';
import { Draggable, DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Button } from 'antd';
import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';

export interface AddItemtProps {
  onChange?: (val: string) => void;
  value: Array<{ label: string; value: string; }>;
  name: string;
}

export function AddItem(props: AddItemtProps) {
  const { value, name } = props;

  return (

    <FieldArray
      name={name}
      render={arrayHelpers => {
        const onDragEnd = (result: DropResult) => {
          if (!result.destination) {
            return;
          }

          if (result.destination.index === result.source.index) {
            return;
          }

          arrayHelpers.move(result.source.index, result.destination.index);

        };
        return (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Stack vertical spacing="tight">
                    <Stack distribution="equalSpacing">
                      <TextStyle variation="strong" size="large">选项</TextStyle>
                      <Stack>
                        <Button size="small" icon={<PlusOutlined />}
                          onClick={() => arrayHelpers.push({ label: '', value: '' })}
                        />
                      </Stack>
                    </Stack>

                    <Stack vertical spacing="extraTight">
                      {value.map((item, index) => {
                        return (

                          <Draggable
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(draggableProvided) => (
                              <div
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                              >
                                <Stack alignment="center" wrap={false}>
                                  <Stack.Item fill>
                                    <TextField inline name={`${name}.${index}.label`} label="标签" />
                                  </Stack.Item>
                                  <Stack.Item fill>
                                    <TextField inline name={`${name}.${index}.value`} label="值" />
                                  </Stack.Item>
                                  <Button icon={<DeleteOutlined />} onClick={() => arrayHelpers.remove(index)} />
                                </Stack>
                              </div>
                            )}
                          </Draggable>

                        );
                      })}
                    </Stack>
                  </Stack>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

        );
      }}
    />

  );
}