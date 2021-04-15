import { Button, Card } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { Stack } from '@example/components/Stack';
import { TextStyle } from '@/components/TextStyle';
import { Picture } from '@example/components/Picture';
import useLocalStorage from 'react-use-localstorage';
import { useNoviceTutorial } from '@example/components/useNoviceTutorial';

const ONBORARDING_TUTORIAL = 'ONBORARDING_TUTORIAL';

export function useOnBoarding() {
  const {
    nextStep,
    prevStep,
    content,
    skip,
    setSteps,
    status: tutorialStatus,
  } = useNoviceTutorial();

  const [status, setStatus] = useLocalStorage(
    ONBORARDING_TUTORIAL,
    'processing'
  );

  useEffect(() => {
    if (tutorialStatus !== 'processing') {
      setStatus(tutorialStatus);
    }
  }, [setStatus, tutorialStatus]);

  useEffect(() => {
    const total = 5;

    setSteps([
      {
        target: '#leftSide',
        placement: 'right',
        content: (
          <CardContent
            index={0}
            skip={skip}
            nextStep={nextStep}
            prevStep={prevStep}
            total={total}
          >
            <Stack vertical>
              <TextStyle>左侧工具面板可通过拖拽快速生成页面</TextStyle>

              <Stack vertical spacing='none'>
                <TextStyle>组件嵌套有一定的规则，并不是都能嵌套。</TextStyle>
                <TextStyle>比方说 输入框组件 必须放到 表单 组件下面</TextStyle>
              </Stack>
            </Stack>
          </CardContent>
        ),
      },
      {
        target: '#centerEditor',
        placement: 'right',
        content: (
          <CardContent
            index={1}
            skip={skip}
            nextStep={nextStep}
            prevStep={prevStep}
            total={total}
          >
            <Stack vertical>
              <Stack vertical spacing='tight'>
                <TextStyle>中间编辑面板主要功能是</TextStyle>
                <TextStyle>
                  · 快速选中元素，对元素位置变更以及编辑预览
                </TextStyle>
              </Stack>

              <TextStyle>- 基础组件已实现鼠标快速移动</TextStyle>
              <TextStyle>- 表单内部组件已实现鼠标拖拽交换位置</TextStyle>
            </Stack>
          </CardContent>
        ),
      },
      {
        target: '#VisualEditorEditMode',
        placement: 'rightTop',
        content: (
          <CardContent
            index={2}
            skip={skip}
            nextStep={nextStep}
            prevStep={prevStep}
            total={total}
          >
            <Stack vertical>
              <TextStyle variation='strong' size='large'>
                提示颜色
              </TextStyle>
              <Stack vertical>
                <Stack vertical spacing='none'>
                  <Stack spacing='tight'>
                    <ColorGrid color='#3b97e3' />
                    <TextStyle>selected / hover状态</TextStyle>
                  </Stack>
                  <Picture
                    src='https://assets.maocanhua.cn/FszWoWLyRBy3C2OL6O2Elbb7dnLC'
                    style={{ width: 200 }}
                  />
                </Stack>

                <Stack vertical spacing='none'>
                  <Stack spacing='tight'>
                    <ColorGrid color='#D0021B' />
                    <TextStyle>insert状态</TextStyle>
                  </Stack>
                  <Picture
                    src='https://assets.maocanhua.cn/FqjPYZzdc0amvizcCYJX8Nmbzmhh'
                    style={{ width: 200 }}
                  />
                </Stack>

                <Stack vertical spacing='none'>
                  <Stack spacing='tight'>
                    <ColorGrid color='#F5A623' />
                    <TextStyle>insertAfter / insertBefore状态</TextStyle>
                  </Stack>
                  <Picture
                    src='https://assets.maocanhua.cn/FlAywI-qgMYe5oPACBJcH59qdb-K'
                    style={{ width: 200 }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        ),
      },
      {
        target: '#rightSide',
        placement: 'left',
        content: (
          <CardContent
            index={3}
            skip={skip}
            nextStep={nextStep}
            prevStep={prevStep}
            total={total}
          >
            <Stack vertical>
              <TextStyle>
                右边配置面板主要功能是对选中的block进行配置，包括样式配置及数据配置
              </TextStyle>
              <TextStyle>
                开发人员也可直接切换到
                <TextStyle variation='strong'>"查看源码"</TextStyle>
                tab，进行修改
              </TextStyle>
            </Stack>
          </CardContent>
        ),
      },
      {
        target: '#ConfigurationPanel-extra',
        placement: 'leftTop',
        content: (
          <CardContent
            index={4}
            skip={skip}
            nextStep={nextStep}
            prevStep={prevStep}
            total={total}
          >
            <Stack vertical>
              <TextStyle variation='strong' size='large'>
                两个很重要的概念
              </TextStyle>

              <Stack spacing='none'>
                <TextStyle variation='strong' size='large'>
                  1.变量
                </TextStyle>
                <TextStyle>
                  对于自定义的组件，绑定变量后可以从变量映射中读取值
                </TextStyle>
              </Stack>

              <Stack vertical spacing='none'>
                <TextStyle variation='strong' size='large'>
                  2.动作
                </TextStyle>
                <TextStyle>
                  绑定了动作后，当被点击的时候，会触发事件。开发者需要捕获该事件，进行处理
                </TextStyle>
              </Stack>
            </Stack>
          </CardContent>
        ),
      },
    ]);
  }, [nextStep, prevStep, setSteps, skip]);

  const runNextStep = useCallback(() => {
    if (status === 'processing') {
      nextStep();
    }
  }, [nextStep, status]);

  return {
    nextStep: runNextStep,
    content: (
      <>
        {content}
        <link
          rel='prefetch'
          href='https://assets.maocanhua.cn/FszWoWLyRBy3C2OL6O2Elbb7dnLC'
        />
        <link
          rel='prefetch'
          href='https://assets.maocanhua.cn/FqjPYZzdc0amvizcCYJX8Nmbzmhh'
        />
        <link
          rel='prefetch'
          href='https://assets.maocanhua.cn/FlAywI-qgMYe5oPACBJcH59qdb-K'
        />
      </>
    ),
  };
}

function CardContent(props: {
  index: number;
  total: number;
  nextStep: VoidFunction;
  prevStep: VoidFunction;
  skip: VoidFunction;
  children: React.ReactNode;
}) {
  const isEndStep = props.index === props.total - 1;
  return (
    <Card
      style={{ width: 300 }}
      title={`${props.index + 1} / ${props.total}`}
      extra={
        <Button
          style={{ paddingLeft: 0, paddingRight: 0 }}
          onClick={props.nextStep}
          type='link'
        >
          {isEndStep ? '完成新手教程' : '下一步'}
        </Button>
      }
    >
      <Card.Grid style={{ width: '100%' }}>{props.children}</Card.Grid>
      <Card.Grid style={{ width: '100%' }}>
        <Stack distribution='trailing'>
          {props.index !== 0 && (
            <Button
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onClick={props.prevStep}
              type='link'
            >
              上一步
            </Button>
          )}
          {!isEndStep && (
            <Button
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onClick={props.skip}
              type='link'
            >
              跳过
            </Button>
          )}
        </Stack>
      </Card.Grid>
    </Card>
  );
}

function ColorGrid({ color }: { color: string }) {
  return (
    <div
      style={{
        display: 'inline-block',
        height: 25,
        width: 25,
        padding: 4,
        border: '1px solid #e6e6e6',
        borderRadius: 4,
        fontSize: 0,
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          position: 'relative',
          display: 'block',
          border: '1px solid #999',
          borderRadius: 2,
          width: '100%',
          height: '100%',
          textAlign: 'center',
          backgroundColor: color,
        }}
      />
    </div>
  );
}
