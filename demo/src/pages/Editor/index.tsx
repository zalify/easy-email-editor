/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import template from '@demo/store/template';
import { useAppSelector } from '@demo/hooks/useAppSelector';
import { useLoading } from '@demo/hooks/useLoading';
import {
  Button,
  ConfigProvider,
  Dropdown,
  Form,
  Input,
  Menu,
  Message,
  Modal,
  PageHeader,
  Select,
} from '@arco-design/web-react';
import { useQuery } from '@demo/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { cloneDeep, set, isEqual } from 'lodash';
import { Loading } from '@demo/components/loading';
import mjml from 'mjml-browser';
import { copy } from '@demo/utils/clipboard';
import { useEmailModal } from './components/useEmailModal';
import services from '@demo/services';
import { IconMoonFill, IconSunFill } from '@arco-design/web-react/icon';
import { Liquid } from 'liquidjs';
import { saveAs } from 'file-saver';
import {
  BlockAvatarWrapper,
  EmailEditor,
  EmailEditorProvider,
  EmailEditorProviderProps,
  IEmailTemplate,
} from 'easy-email-editor';

import { Stack } from '@demo/components/Stack';
import { pushEvent } from '@demo/utils/pushEvent';
import { FormApi } from 'final-form';
import { UserStorage } from '@demo/utils/user-storage';

import { useCollection } from './components/useCollection';
import { AdvancedType, BasicType, IBlockData, JsonToMjml } from 'easy-email-core';
import {
  BlockMarketManager,
  ExtensionProps,
  MjmlToJson,
  StandardLayout,
} from 'easy-email-extensions';
import { AutoSaveAndRestoreEmail } from '@demo/components/AutoSaveAndRestoreEmail';

// Register external blocks
import './components/CustomBlocks';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import blueTheme from '@arco-themes/react-easy-email-theme/css/arco.css?inline';
import purpleTheme from '@arco-themes/react-easy-email-theme-purple/css/arco.css?inline';
import greenTheme from '@arco-themes/react-easy-email-theme-green/css/arco.css?inline';
import { testMergeTags } from './testMergeTags';
import { useMergeTagsModal } from './components/useMergeTagsModal';

import { useWindowSize } from 'react-use';
import { CustomBlocksType } from './components/CustomBlocks/constants';
import localesData from 'easy-email-localization/locales/locales.json';
import { Uploader } from '@demo/utils/Uploader';
import axios from 'axios';
import enUS from '@arco-design/web-react/es/locale/en-US';

console.log(localesData);

const defaultCategories: ExtensionProps['categories'] = [
  {
    label: 'Content',
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT,
      },
      {
        type: AdvancedType.IMAGE,
        payload: { attributes: { padding: '0px 0px 0px 0px' } },
      },
      {
        type: AdvancedType.BUTTON,
      },
      {
        type: AdvancedType.SOCIAL,
      },
      {
        type: AdvancedType.DIVIDER,
      },
      {
        type: AdvancedType.SPACER,
      },
      {
        type: AdvancedType.HERO,
      },
      {
        type: AdvancedType.WRAPPER,
      },
    ],
  },
  {
    label: 'Layout',
    active: true,
    displayType: 'column',
    blocks: [
      {
        title: '2 columns',
        payload: [
          ['50%', '50%'],
          ['33%', '67%'],
          ['67%', '33%'],
          ['25%', '75%'],
          ['75%', '25%'],
        ],
      },
      {
        title: '3 columns',
        payload: [
          ['33.33%', '33.33%', '33.33%'],
          ['25%', '25%', '50%'],
          ['50%', '25%', '25%'],
        ],
      },
      {
        title: '4 columns',
        payload: [['25%', '25%', '25%', '25%']],
      },
    ],
  },
  {
    label: 'Custom',
    active: true,
    displayType: 'custom',
    blocks: [
      <BlockAvatarWrapper type={CustomBlocksType.PRODUCT_RECOMMENDATION}>
        <div
          style={{
            position: 'relative',
            border: '1px solid #ccc',
            marginBottom: 20,
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <img
            src={
              'http://res.cloudinary.com/dwkp0e1yo/image/upload/v1665841389/ctbjtig27parugrztdhk.png'
            }
            style={{
              maxWidth: '100%',
            }}
          />
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
        </div>
      </BlockAvatarWrapper>,
    ],
  },
];

const imageCompression = import('browser-image-compression');

const fontList = [
  'Arial',
  'Tahoma',
  'Verdana',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Lato',
  'Montserrat',
  '黑体',
  '仿宋',
  '楷体',
  '标楷体',
  '华文仿宋',
  '华文楷体',
  '宋体',
  '微软雅黑',
].map(item => ({ value: item, label: item }));

export default function Editor() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<'blue' | 'green' | 'purple'>('blue');
  const dispatch = useDispatch();
  const history = useHistory();
  const templateData = useAppSelector('template');
  const [locale, setLocale] = useState('en');
  const { addCollection, removeCollection, collectionCategory } = useCollection();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const { width } = useWindowSize();

  const emailPattern =
    // eslint-disable-next-line
    /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

  const postEmail = async () => {
    if (!emailPattern.test(text)) {
      Message.error('Please enter a valid email address');
      return;
    }
    pushEvent({
      event: 'TryNewEditor',
      payload: { email: text },
    });
    await axios.post(`/api/email`, {
      email: text,
    });
    setVisible(false);
  };

  const smallScene = width < 1400;

  const { openModal, modal } = useEmailModal();
  const { id, userId } = useQuery();
  const loading = useLoading(template.loadings.fetchById);
  const {
    modal: mergeTagsModal,
    openModal: openMergeTagsModal,
    mergeTags,
    setMergeTags,
  } = useMergeTagsModal(testMergeTags);

  const isSubmitting = useLoading([
    template.loadings.create,
    template.loadings.updateById,
  ]);

  useEffect(() => {
    if (collectionCategory) {
      BlockMarketManager.addCategories([collectionCategory]);
      return () => {
        BlockMarketManager.removeCategories([collectionCategory]);
      };
    }
  }, [collectionCategory]);

  useEffect(() => {

    window.addEventListener('message', (event) => {

      console.log("Inside addEventListener - React"); // This will log the message sent from the Dart/Flutter app
      console.log("event data - " +event.data);// This will log the message sent from the Dart/Flutter ap
      // dispatch(template.actions.fetchByJson(event.data));
      const jsonData = event.data;

      if(!jsonData) {
        dispatch(template.actions.fetchDefaultTemplate(undefined));
      } else {
        // let jsonParsedData = JSON.parse(jsonData);
        // const stringifyJsonData= JSON.stringify(jsonParsedData);
        dispatch(template.actions.fetchByJson({ json: jsonData }));
      }
    });
    // if (id) {
    //   if (!userId) {
    //     UserStorage.getAccount().then(account => {
    //       dispatch(template.actions.fetchById({ id: +id, userId: account.user_id }));
    //     });
    //   } else {
    //     dispatch(template.actions.fetchById({ id: +id, userId: +userId }));
    //   }
    // } else {
    //   // dispatch(template.actions.fetchDefaultTemplate(undefined));
    //   const dataToPass = JSON.parse('{\n  "article_id": 802,\n  "title": "Arturia - Newsletter",\n  "summary": "Nice to meet you!",\n  "picture": "https://assets.maocanhua.cn/5523abbd-6484-40b0-a368-bbea5e647bf4-",\n  "category_id": 96,\n  "origin_source": "",\n  "readcount": 67,\n  "user_id": 107,\n  "secret": 0,\n  "level": 10,\n  "created_at": 1645697464,\n  "updated_at": 1645865828,\n  "deleted_at": 0,\n  "content": {\n    "article_id": 802,\n    "content": "{\\"type\\":\\"page\\",\\"data\\":{\\"value\\":{\\"breakpoint\\":\\"480px\\",\\"headAttributes\\":\\"\\",\\"font-size\\":\\"14px\\",\\"line-height\\":\\"1.7\\",\\"headStyles\\":[],\\"fonts\\":[],\\"responsive\\":true,\\"font-family\\":\\"lucida Grande,Verdana,Microsoft YaHei\\",\\"text-color\\":\\"#000000\\"}},\\"attributes\\":{\\"background-color\\":\\"#F2F2F2\\",\\"width\\":\\"600px\\"},\\"children\\":[{\\"type\\":\\"advanced_section\\",\\"data\\":{\\"value\\":{\\"noWrap\\":false}},\\"attributes\\":{\\"padding\\":\\"20px 0px 0px 0px\\",\\"border\\":\\"none\\",\\"direction\\":\\"ltr\\",\\"text-align\\":\\"center\\",\\"background-repeat\\":\\"repeat\\",\\"background-size\\":\\"auto\\",\\"background-position\\":\\"top center\\",\\"vertical-align\\":\\"center\\"},\\"children\\":[{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"middle\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_image\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"align\\":\\"center\\",\\"height\\":\\"auto\\",\\"src\\":\\"https://www.arturia.com/images/newsletters/2016-02-black/Logo-Baseline-0.15x.png\\",\\"width\\":\\"144px\\",\\"href\\":\\"https://www.arturia.com\\",\\"alt\\":\\"\\",\\"padding\\":\\"10px 25px 10px 25px\\"},\\"children\\":[]}]},{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_text\\",\\"data\\":{\\"value\\":{\\"content\\":\\"NEWS<br />MARCH 2016\\"}},\\"attributes\\":{\\"align\\":\\"left\\",\\"font-family\\":\\"Helvetica,Arial,sans-serif\\",\\"line-height\\":\\"120%\\",\\"text-decoration\\":\\"underline\\",\\"padding\\":\\"10px 25px 10px 25px\\"},\\"children\\":[]}]}]},{\\"type\\":\\"advanced_section\\",\\"data\\":{\\"value\\":{\\"noWrap\\":false}},\\"attributes\\":{\\"background-repeat\\":\\"repeat\\",\\"background-size\\":\\"auto\\",\\"background-position\\":\\"top center\\",\\"border\\":\\"none\\",\\"direction\\":\\"ltr\\",\\"text-align\\":\\"center\\",\\"background-color\\":\\"#000001\\",\\"padding\\":\\"20px 0px 20px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_text\\",\\"data\\":{\\"value\\":{\\"content\\":\\"Dear {firstname}, <br /><br /> You used to follow rhythm, now rhythm follows you, everywhere you go!<br /> Discover iSpark, the mobile transposition of our renowned beat-making solution Spark.\\"}},\\"attributes\\":{\\"align\\":\\"left\\",\\"color\\":\\"#FFFFFE\\",\\"font-family\\":\\"Helvetica,Arial,sans-serif\\",\\"font-size\\":\\"14px\\",\\"line-height\\":\\"120%\\",\\"padding\\":\\"0px 25px 0px 25px\\"},\\"children\\":[]}]}]},{\\"type\\":\\"advanced_section\\",\\"data\\":{\\"value\\":{\\"noWrap\\":false}},\\"attributes\\":{\\"background-repeat\\":\\"repeat\\",\\"background-size\\":\\"auto\\",\\"background-position\\":\\"top center\\",\\"border\\":\\"none\\",\\"direction\\":\\"ltr\\",\\"text-align\\":\\"center\\",\\"padding\\":\\"20px 0px 20px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"background-color\\":\\"#FFFFFE\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_image\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"align\\":\\"center\\",\\"height\\":\\"auto\\",\\"src\\":\\"https://www.arturia.com/images/newsletters/2016-02-ispark/05.jpg\\",\\"href\\":\\"https://www.arturia.com/products/ipad-synths/ispark/overview\\",\\"alt\\":\\"\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[]},{\\"type\\":\\"advanced_text\\",\\"data\\":{\\"value\\":{\\"content\\":\\"iSpark is a powerful mobile production tool allowing you to create and play rhythmic tracks, complex grooves and even complete songs. Its sonic strike force comes along with an unwavering workflow and a real flexibility.\\"}},\\"attributes\\":{\\"align\\":\\"left\\",\\"font-family\\":\\"Helvetica,Arial,sans-serif\\",\\"font-size\\":\\"14px\\",\\"line-height\\":\\"120%\\",\\"padding\\":\\"25px 25px 25px 25px\\"},\\"children\\":[]}]}]},{\\"type\\":\\"advanced_section\\",\\"data\\":{\\"value\\":{\\"noWrap\\":false}},\\"attributes\\":{\\"background-repeat\\":\\"repeat\\",\\"background-size\\":\\"auto\\",\\"background-position\\":\\"top center\\",\\"border\\":\\"none\\",\\"direction\\":\\"ltr\\",\\"text-align\\":\\"center\\",\\"padding\\":\\"20px 0px 20px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"background-color\\":\\"#FFFFFE\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_image\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"align\\":\\"center\\",\\"height\\":\\"auto\\",\\"src\\":\\"https://www.arturia.com/images/newsletters/2016-02-ispark/06.jpg\\",\\"href\\":\\"https://www.arturia.com/products/ipad-synths/ispark/overview\\",\\"alt\\":\\"\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[]},{\\"type\\":\\"advanced_text\\",\\"data\\":{\\"value\\":{\\"content\\":\\"Check out the iSpark introduction movie shot during the Arturia Experience event at the ADE featuring the Dutch beatmaker FilosofischeStilte.\\"}},\\"attributes\\":{\\"align\\":\\"left\\",\\"font-family\\":\\"Helvetica,Arial,sans-serif\\",\\"font-size\\":\\"14px\\",\\"line-height\\":\\"120%\\",\\"padding\\":\\"25px 25px 25px 25px\\"},\\"children\\":[]}]}]},{\\"type\\":\\"advanced_section\\",\\"data\\":{\\"value\\":{\\"noWrap\\":false}},\\"attributes\\":{\\"background-repeat\\":\\"repeat\\",\\"background-size\\":\\"auto\\",\\"background-position\\":\\"top center\\",\\"border\\":\\"none\\",\\"direction\\":\\"ltr\\",\\"text-align\\":\\"center\\",\\"padding\\":\\"20px 0px 20px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"background-color\\":\\"#FFFFFE\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_image\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"align\\":\\"center\\",\\"height\\":\\"auto\\",\\"src\\":\\"https://www.arturia.com/images/newsletters/2016-02-ispark/07.jpg\\",\\"href\\":\\"https://www.arturia.com/products/ipad-synths/ispark/details\\",\\"alt\\":\\"\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[]},{\\"type\\":\\"advanced_text\\",\\"data\\":{\\"value\\":{\\"content\\":\\"Follow Mauricio Garcia, Arturia Product Specialist, presenting you the many clever features of iSpark in this series of tutorials.\\"}},\\"attributes\\":{\\"align\\":\\"left\\",\\"font-family\\":\\"Helvetica,Arial,sans-serif\\",\\"font-size\\":\\"14px\\",\\"line-height\\":\\"120%\\",\\"padding\\":\\"25px 25px 25px 25px\\"},\\"children\\":[]}]}]},{\\"type\\":\\"advanced_section\\",\\"data\\":{\\"value\\":{\\"noWrap\\":false}},\\"attributes\\":{\\"background-repeat\\":\\"repeat\\",\\"background-size\\":\\"auto\\",\\"background-position\\":\\"top center\\",\\"border\\":\\"none\\",\\"direction\\":\\"ltr\\",\\"text-align\\":\\"center\\",\\"padding\\":\\"20px 0px 20px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"background-color\\":\\"#FFFFFE\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_image\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"align\\":\\"center\\",\\"height\\":\\"auto\\",\\"src\\":\\"https://www.arturia.com/images/newsletters/2016-02-ispark/08.jpg\\",\\"href\\":\\"https://www.arturia.com/products/ipad-synths/ispark/details\\",\\"alt\\":\\"\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[]},{\\"type\\":\\"advanced_text\\",\\"data\\":{\\"value\\":{\\"content\\":\\"iSpark includes a tremendous collection of factory kits and individual instruments covering most of the field of application of beat-making but it is also compatible with the existing Spark resources and Expansion Packs.\\"}},\\"attributes\\":{\\"align\\":\\"left\\",\\"font-family\\":\\"Helvetica,Arial,sans-serif\\",\\"font-size\\":\\"14px\\",\\"line-height\\":\\"120%\\",\\"padding\\":\\"25px 25px 10px 25px\\"},\\"children\\":[]},{\\"type\\":\\"advanced_button\\",\\"data\\":{\\"value\\":{\\"content\\":\\"Learn more about iSpark\\"}},\\"attributes\\":{\\"align\\":\\"center\\",\\"background-color\\":\\"#2DDCB4\\",\\"color\\":\\"#ffffff\\",\\"font-weight\\":\\"normal\\",\\"border-radius\\":\\"8px\\",\\"line-height\\":\\"120%\\",\\"target\\":\\"_blank\\",\\"vertical-align\\":\\"middle\\",\\"border\\":\\"none\\",\\"text-align\\":\\"center\\",\\"href\\":\\"https://www.arturia.com/products/ipad-synths/ispark/overview\\",\\"font-size\\":\\"14px\\",\\"font-family\\":\\"Helvetica,Arial,sans-serif\\",\\"padding\\":\\"10px 25px 25px 25px\\"},\\"children\\":[]}]}]},{\\"type\\":\\"advanced_section\\",\\"data\\":{\\"value\\":{\\"noWrap\\":false}},\\"attributes\\":{\\"background-repeat\\":\\"repeat\\",\\"background-size\\":\\"auto\\",\\"background-position\\":\\"top center\\",\\"border\\":\\"none\\",\\"direction\\":\\"ltr\\",\\"text-align\\":\\"center\\",\\"background-color\\":\\"#000001\\",\\"padding\\":\\"20px 0px 20px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_text\\",\\"data\\":{\\"value\\":{\\"content\\":\\"Musically yours,<br /> The Arturia Team\\"}},\\"attributes\\":{\\"align\\":\\"left\\",\\"color\\":\\"#FFFFFE\\",\\"font-family\\":\\"Helvetica,Arial,sans-serif\\",\\"font-size\\":\\"14px\\",\\"padding\\":\\"10px 25px 10px 25px\\"},\\"children\\":[]}]}]},{\\"type\\":\\"advanced_section\\",\\"data\\":{\\"value\\":{\\"noWrap\\":false}},\\"attributes\\":{\\"background-repeat\\":\\"repeat\\",\\"background-size\\":\\"auto\\",\\"background-position\\":\\"top center\\",\\"border\\":\\"none\\",\\"direction\\":\\"ltr\\",\\"text-align\\":\\"center\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_image\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"align\\":\\"center\\",\\"height\\":\\"auto\\",\\"src\\":\\"https://www.arturia.com/images/newsletters/2016-02-ispark/facebook_arturia.png\\",\\"width\\":\\"86px\\",\\"href\\":\\"http://www.facebook.com/arturia2\\",\\"alt\\":\\"\\",\\"padding\\":\\"10px 25px 10px 25px\\"},\\"children\\":[]}]},{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_image\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"align\\":\\"center\\",\\"height\\":\\"auto\\",\\"src\\":\\"https://www.arturia.com/images/newsletters/2016-02-ispark/youtube.png\\",\\"width\\":\\"86px\\",\\"href\\":\\"http://www.youtube.com/arturiaweb\\",\\"alt\\":\\"\\",\\"padding\\":\\"10px 25px 10px 25px\\"},\\"children\\":[]}]},{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_image\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"align\\":\\"center\\",\\"height\\":\\"auto\\",\\"src\\":\\"https://www.arturia.com/images/newsletters/2016-02-ispark/Soundcloud.png\\",\\"width\\":\\"86px\\",\\"href\\":\\"http://soundcloud.com/arturia-official\\",\\"alt\\":\\"\\",\\"padding\\":\\"10px 25px 10px 25px\\"},\\"children\\":[]}]},{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_image\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"align\\":\\"center\\",\\"height\\":\\"auto\\",\\"src\\":\\"https://www.arturia.com/images/newsletters/2016-02-ispark/twitter_arturia.png\\",\\"width\\":\\"86px\\",\\"href\\":\\"http://twitter.com/arturiaofficial\\",\\"alt\\":\\"\\",\\"padding\\":\\"10px 25px 10px 25px\\"},\\"children\\":[]}]}]},{\\"type\\":\\"advanced_section\\",\\"data\\":{\\"value\\":{\\"noWrap\\":false}},\\"attributes\\":{\\"background-repeat\\":\\"repeat\\",\\"background-size\\":\\"auto\\",\\"background-position\\":\\"top center\\",\\"border\\":\\"none\\",\\"direction\\":\\"ltr\\",\\"text-align\\":\\"center\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_text\\",\\"data\\":{\\"value\\":{\\"content\\":\\"See this email in your browser <a href=\\\\\\"https://www.arturia.com/images/newsletters/2016-02-ispark/newsletter.html\\\\\\" style=\\\\\\"text-decoration:none;color:#2DDCB4\\\\\\">here</a>\\"}},\\"attributes\\":{\\"align\\":\\"center\\",\\"font-family\\":\\"Helvetica,Arial,sans-serif\\",\\"padding\\":\\"0px 25px 10px 25px\\"},\\"children\\":[]},{\\"type\\":\\"advanced_divider\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"align\\":\\"center\\",\\"border-width\\":\\"1px\\",\\"border-style\\":\\"solid\\",\\"border-color\\":\\"#C9CCCF\\",\\"padding\\":\\"10px 0px 10px 0px\\"},\\"children\\":[]}]}]},{\\"type\\":\\"advanced_section\\",\\"data\\":{\\"value\\":{\\"noWrap\\":false}},\\"attributes\\":{\\"background-repeat\\":\\"repeat\\",\\"background-size\\":\\"auto\\",\\"background-position\\":\\"top center\\",\\"border\\":\\"none\\",\\"direction\\":\\"ltr\\",\\"text-align\\":\\"center\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_column\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"border\\":\\"none\\",\\"vertical-align\\":\\"top\\",\\"padding\\":\\"0px 0px 0px 0px\\"},\\"children\\":[{\\"type\\":\\"advanced_text\\",\\"data\\":{\\"value\\":{\\"content\\":\\"Your email address is on this list as a result of a subscription, information request, competition, or other correspondence you may have had with us in the past. If you would like to be removed from our list, check the email address this newsletter\\\\n          was sent to and use the following link: <a href=\\\\\\"https://www.arturia.com/index.php?option=com_myarturia&view=newsletter&task=unsubscribeFromEmail&email={email}&token={title}&utm_source=elasticemail&utm_medium=email&utm_campaign=arturia_unsubscribe_2016&utm_term=nl-ispark-launch&utm_content=unsubscribe_footer\\\\\\"\\\\n            style=\\\\\\"text-decoration:none;color:#2DDCB4\\\\\\">Unsubscribe</a>. Privacy policy available <a href=\\\\\\"https://www.arturia.com/privacypolicy\\\\\\" style=\\\\\\"text-decoration:none;color:#2DDCB4\\\\\\">here</a>.\\"}},\\"attributes\\":{\\"align\\":\\"left\\",\\"font-family\\":\\"Helvetica,Arial,sans-serif\\",\\"font-size\\":\\"10px\\",\\"line-height\\":\\"12px\\",\\"padding\\":\\"0px 25px 0px 25px\\"},\\"children\\":[]},{\\"type\\":\\"advanced_text\\",\\"data\\":{\\"value\\":{\\"content\\":\\"ARTURIA: <a href=\\\\\\"https://www.arturia.com\\\\\\" style=\\\\\\"text-decoration:none;color:#2DDCB4\\\\\\">https://www.arturia.com</a> - Contact: <a href=\\\\\\"mailto:info@arturia.com\\\\\\" style=\\\\\\"text-decoration:none;color:#2DDCB4\\\\\\">info</a><br /> ARTURIA France: 30 chemin\\\\n          du vieux chêne, 38240 Meylan - FRANCE<br /> ARTURIA US: : 5776-D Lindero Cyn Rd #239 -Westlake Village, CA 91362 - USA\\"}},\\"attributes\\":{\\"align\\":\\"left\\",\\"font-family\\":\\"Helvetica,Arial,sans-serif\\",\\"font-size\\":\\"10px\\",\\"line-height\\":\\"12px\\",\\"padding\\":\\"10px 25px 0px 25px\\"},\\"children\\":[]},{\\"type\\":\\"advanced_divider\\",\\"data\\":{\\"value\\":{}},\\"attributes\\":{\\"align\\":\\"center\\",\\"border-width\\":\\"1px\\",\\"border-style\\":\\"solid\\",\\"border-color\\":\\"#C9CCCF\\",\\"padding\\":\\"10px 0px 10px 0px\\"},\\"children\\":[]}]}]}]}"\n  },\n  "tags": [\n    {\n      "tag_id": 74,\n      "name": "券包",\n      "picture": "http://assets.maocanhua.cn/Fqpjw0PHvSPy4sh0giFmkpuxgKhU",\n      "desc": "券包",\n      "created_at": 1576227276,\n      "user_id": 77,\n      "updated_at": 0,\n      "deleted_at": 0\n    }\n  ]\n}');
    //
    //   // Convert the object to a JSON string
    //   const jsonData = JSON.stringify(dataToPass);
    //   // const jsonData = dataToPass.content.content;
    //   debugger;
    //
    //   // Pass the JSON string to the dispatch function
    //   dispatch(template.actions.fetchByJson({ json: jsonData }));
    // }

    return () => {
      dispatch(template.actions.set(null));
    };
  }, [dispatch, id, userId]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      document.body.removeAttribute('arco-theme');
    }
  }, [isDarkMode]);

  const onUploadImage = async (blob: Blob) => {
    const compressionFile = await (
      await imageCompression
    ).default(blob as File, {
      maxWidthOrHeight: 1440,
    });
    return services.common.uploadByQiniu(compressionFile);
  };

  const onChangeTheme = useCallback(t => {
    setTheme(t);
  }, []);

  const onChangeMergeTag = useCallback((path: string, val: any) => {
    setMergeTags(old => {
      const newObj = cloneDeep(old);
      set(newObj, path, val);
      return newObj;
    });
  }, []);

  const onImportMJML = async ({
    restart,
  }: {
    restart: (val: IEmailTemplate) => void;
  }) => {
    const uploader = new Uploader(() => Promise.resolve(''), {
      accept: 'text/mjml',
      limit: 1,
    });

    const [file] = await uploader.chooseFile();
    const reader = new FileReader();
    const pageData = await new Promise<[string, IEmailTemplate['content']]>(
      (resolve, reject) => {
        reader.onload = function (evt) {
          if (!evt.target) {
            reject();
            return;
          }
          try {
            const pageData = MjmlToJson(evt.target.result as any);
            resolve([file.name, pageData]);
          } catch (error) {
            reject();
          }
        };
        reader.readAsText(file);
      },
    );

    restart({
      subject: pageData[0],
      content: pageData[1],
      subTitle: '',
    });
  };

  const onImportJSON = async ({
    restart,
  }: {
    restart: (val: IEmailTemplate) => void;
  }) => {
    const uploader = new Uploader(() => Promise.resolve(''), {
      accept: 'application/json',
      limit: 1,
    });

    const [file] = await uploader.chooseFile();
    const reader = new FileReader();
    const emailTemplate = await new Promise<IEmailTemplate>((resolve, reject) => {
      reader.onload = function (evt) {
        if (!evt.target) {
          reject();
          return;
        }
        try {
          const template = JSON.parse(evt.target.result as any) as IEmailTemplate;
          resolve(template);
        } catch (error) {
          reject();
        }
      };
      reader.readAsText(file);
    });

    restart({
      subject: emailTemplate.subject,
      content: emailTemplate.content,
      subTitle: emailTemplate.subTitle,
    });
  };


  const onExportMJML = (values: IEmailTemplate) => {
    const mjmlString = JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
      dataSource: mergeTags,
    });

    pushEvent({ event: 'MJMLExport', payload: { values, mergeTags } });
    navigator.clipboard.writeText(mjmlString);
    saveAs(new Blob([mjmlString], { type: 'text/mjml' }), 'easy-email.mjml');
  };

  const onSave = (values: IEmailTemplate) => {
    const jsonString = JSON.stringify(values.content);
    const sendJsonToFlutter = {
      "article_id": 815,
      "title": "Sphero - Newsletter",
      "summary": "Nice to meet you!",
      "picture": "https://assets.maocanhua.cn/4262aa6d-5d8e-4774-8f7c-1af28cb18ed4-",
      "category_id": 96,
      "origin_source": "",
      "readcount": 11,
      "user_id": 107,
      "secret": 0,
      "level": 10,
      "created_at": 1645698574,
      "updated_at": 1645865730,
      "deleted_at": 0,
      "content": {
        "article_id": 815,
        "content": jsonString,
      },
      "tags": [
        {
          "tag_id": 74,
          "name": "券包",
          "picture": "http://assets.maocanhua.cn/Fqpjw0PHvSPy4sh0giFmkpuxgKhU",
          "desc": "券包",
          "created_at": 1576227276,
          "user_id": 77,
          "updated_at": 0,
          "deleted_at": 0
        }
      ]
    };

    // window.postMessage({ message: JSON.stringify(sendJsonToFlutter) }, 'http://localhost:5000');

    debugger;
  };

  const onExportHTML = (values: IEmailTemplate) => {
    const mjmlString = JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
      dataSource: mergeTags,
    });

    const html = mjml(mjmlString, {}).html;

    pushEvent({ event: 'HTMLExport', payload: { values, mergeTags } });
    navigator.clipboard.writeText(html);
    saveAs(new Blob([html], { type: 'text/html' }), 'easy-email.html');
  };

  const onExportJSON = (values: IEmailTemplate) => {
    const jsonString = JSON.stringify(values, null, 2);

    // Log the JSON string to the console
    console.log(jsonString);

    debugger;
    navigator.clipboard.writeText(JSON.stringify(values, null, 2));
    saveAs(
      new Blob([JSON.stringify(values, null, 2)], { type: 'application/json' }),
      'easy-email.json',
    );
  };

  const onExportImage = async (values: IEmailTemplate) => {
    Message.loading('Loading...');
    const html2canvas = (await import('html2canvas')).default;
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    const mjmlString = JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
      dataSource: mergeTags,
    });

    const html = mjml(mjmlString, {}).html;

    container.innerHTML = html;
    document.body.appendChild(container);

    const blob = await new Promise<any>(resolve => {
      html2canvas(container, { useCORS: true }).then(canvas => {
        return canvas.toBlob(resolve, 'png', 0.1);
      });
    });
    saveAs(blob, 'demo.png');
    Message.clear();
  };

  const initialValues: IEmailTemplate | null = useMemo(() => {
    if (!templateData) return null;
    const sourceData = cloneDeep(templateData.content) as IBlockData;
    return {
      ...templateData,
      content: sourceData, // replace standard block
    };
  }, [templateData]);

  const onSubmit = useCallback(
    async (
      values: IEmailTemplate,
      form: FormApi<IEmailTemplate, Partial<IEmailTemplate>>,
    ) => {
      pushEvent({ event: 'EmailSave' });
      if (id) {
        const isChanged = !(
          isEqual(initialValues?.content, values.content) &&
          isEqual(initialValues?.subTitle, values?.subTitle) &&
          isEqual(initialValues?.subject, values?.subject)
        );

        if (!isChanged) {
          Message.success('Updated success!');
          form.restart(values);
          return;
        }
        dispatch(
          template.actions.updateById({
            id: +id,
            template: values,
            success() {
              Message.success('Updated success!');
              form.restart(values);
            },
          }),
        );
      } else {
        dispatch(
          template.actions.create({
            template: values,
            success(id, newTemplate) {
              Message.success('Saved success!');
              form.restart(newTemplate);
              history.replace(`/editor?id=${id}`);
            },
          }),
        );
      }
    },
    [dispatch, history, id, initialValues],
  );

  const onBeforePreview: EmailEditorProviderProps['onBeforePreview'] = useCallback(
    (html: string, mergeTags) => {
      const engine = new Liquid();
      const tpl = engine.parse(html);
      return engine.renderSync(tpl, mergeTags);
    },
    [],
  );

  const themeStyleText = useMemo(() => {
    if (theme === 'green') return greenTheme;
    if (theme === 'purple') return purpleTheme;
    return blueTheme;
  }, [theme]);

  if (!templateData && loading) {
    return (
      <Loading loading={loading}>
        <div style={{ height: '100vh' }} />
      </Loading>
    );
  }

  if (!initialValues) return null;

  return (
    <ConfigProvider locale={enUS}>
      <div>
        <style>{themeStyleText}</style>
        <EmailEditorProvider
          key={id}
          height={'calc(100vh - 68px)'}
          data={initialValues}
          // interactiveStyle={{
          //   hoverColor: '#78A349',
          //   selectedColor: '#1890ff',
          // }}
          // onAddCollection={addCollection}
          // onRemoveCollection={({ id }) => removeCollection(id)}
          onUploadImage={onUploadImage}
          fontList={fontList}
          onSubmit={onSubmit}
          onChangeMergeTag={onChangeMergeTag}
          autoComplete
          enabledLogic
          // enabledMergeTagsBadge
          dashed={false}
          mergeTags={mergeTags}
          mergeTagGenerate={tag => `{{${tag}}}`}
          onBeforePreview={onBeforePreview}
          socialIcons={[]}
          locale={localesData[locale]}
        >
          {({ values }, { submit, restart }) => {
            return (
              <>
                <PageHeader
                  style={{ background: 'var(--color-bg-2)' }}
                  backIcon
                  title='Edit'
                  onBack={() => history.push('/')}
                  extra={
                    <Stack alignment='center'>
                      <Button
                        onClick={() => setIsDarkMode(v => !v)}
                        shape='circle'
                        type='text'
                        icon={isDarkMode ? <IconMoonFill /> : <IconSunFill />}
                      ></Button>

                      <Select
                        onChange={onChangeTheme}
                        value={theme}
                      >
                        <Select.Option value='blue'>Blue</Select.Option>
                        <Select.Option value='green'>Green</Select.Option>
                        <Select.Option value='purple'>Purple</Select.Option>
                      </Select>
                      <Select
                        onChange={setLocale}
                        value={locale}
                      >
                        <Select.Option value='en'>English</Select.Option>
                        <Select.Option value='zh-Hans'>中文简体</Select.Option>
                        <Select.Option value='zh-Hant'>中文繁體</Select.Option>
                        <Select.Option value='ja'>Japanese</Select.Option>
                        <Select.Option value='it'>Italian</Select.Option>
                      </Select>

                      {/* <Button onClick={openMergeTagsModal}>Update mergeTags</Button> */}

                      <Dropdown
                        droplist={
                          <Menu>
                            <Menu.Item
                              key='MJML'
                              onClick={() => onImportMJML({ restart })}
                            >
                              Import from MJML
                            </Menu.Item>

                            <Menu.Item
                              key='JSON'
                              onClick={() => onImportJSON({ restart })}
                            >
                              Import from JSON
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button>
                          <strong>Import</strong>
                        </Button>
                      </Dropdown>
                      <Button
                        onClick={() => onSave(values)}
                      >
                        <strong>Save</strong>
                      </Button>
                      <Dropdown
                        droplist={
                          <Menu>
                            <Menu.Item
                              key='Export MJML'
                              onClick={() => onExportMJML(values)}
                            >
                              Export MJML
                            </Menu.Item>
                            <Menu.Item
                              key='Export HTML'
                              onClick={() => onExportHTML(values)}
                            >
                              Export HTML
                            </Menu.Item>
                            <Menu.Item
                              key='Export JSON'
                              onClick={() => onExportJSON(values)}
                            >
                              Export JSON
                            </Menu.Item>
                            <Menu.Item
                              key='Export Image'
                              onClick={() => onExportImage(values)}
                            >
                              Export Image
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button>
                          <strong>Export</strong>
                        </Button>
                      </Dropdown>
                      <Button onClick={() => setVisible(true)}>
                        <strong>Try responsive editor</strong>
                      </Button>
                      <a
                        href='https://www.buymeacoffee.com/easyemail?utm_source=webside&utm_medium=button&utm_content=donate'
                        target='_blank'
                        onClick={ev => {
                          ev.preventDefault();
                          pushEvent({ event: 'Donate' });
                          window.open(
                            'https://www.buymeacoffee.com/easyemail?utm_source=webside&utm_medium=button&utm_content=donate',
                            '_blank',
                          );
                        }}
                      >
                        <img
                          style={{
                            marginTop: -16,
                            position: 'relative',
                            top: 11,
                            height: 32,
                          }}
                          src='https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png'
                          alt='Buy Me A Coffee'
                        />
                      </a>
                    </Stack>
                  }
                />
                <StandardLayout
                  compact={!smallScene}
                  categories={defaultCategories}
                >
                  <EmailEditor />
                </StandardLayout>
                <AutoSaveAndRestoreEmail />
              </>
            );
          }}
        </EmailEditorProvider>
        {modal}
        {mergeTagsModal}
        <Modal
          title={<p style={{ textAlign: 'left' }}>Leave your email</p>}
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={postEmail}
        >
          <Form.Item label='Email'>
            <Input
              value={text}
              onChange={setText}
            />
          </Form.Item>
        </Modal>
        <style>{`#bmc-wbtn {display:none !important;}`}</style>
      </div>
    </ConfigProvider>
  );
}

function replaceStandardBlockToAdvancedBlock(blockData: IBlockData) {
  const map = {
    [BasicType.TEXT]: AdvancedType.TEXT,
    [BasicType.BUTTON]: AdvancedType.BUTTON,
    [BasicType.IMAGE]: AdvancedType.IMAGE,
    [BasicType.DIVIDER]: AdvancedType.DIVIDER,
    [BasicType.SPACER]: AdvancedType.SPACER,
    [BasicType.SOCIAL]: AdvancedType.SOCIAL,
    [BasicType.ACCORDION]: AdvancedType.ACCORDION,
    [BasicType.CAROUSEL]: AdvancedType.CAROUSEL,
    [BasicType.NAVBAR]: AdvancedType.NAVBAR,
    [BasicType.WRAPPER]: AdvancedType.WRAPPER,
    [BasicType.SECTION]: AdvancedType.SECTION,
    [BasicType.GROUP]: AdvancedType.GROUP,
    [BasicType.COLUMN]: AdvancedType.COLUMN,
  };

  if (map[blockData.type]) {
    blockData.type = map[blockData.type];
  }
  blockData.children.forEach(replaceStandardBlockToAdvancedBlock);
  return blockData;
}
