import { Panel } from './Panel';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';

export type IImage = IBlockData<{
  'alt'?: string;
  'src'?: string;
  'title'?: string;
  'href'?: string;
  'target'?: string;
  'border'?: string;
  'height'?: string;
  'text-decoration'?: string;
  'text-transform'?: CSSProperties['textTransform'];
  'align'?: CSSProperties['textAlign'];
  'container-background-color'?: string;
  'width'?: string;
  'padding'?: string;
}>;

export const Image = {
  name: 'image',
  type: BasicType.IMAGE,
  Editor,
  Panel,
  createInstance,
  validChildrenType: [],
};

// align	position	image alignment	center
// alt	string	image description	n/a
// border	string	css border definition	none
// border-top	string	css border definition	none
// border-bottom	string	css border definition	none
// border-left	string	css border definition	none
// border-right	string	css border definition	none
// border-radius	px	border radius	n/a
// container-background-color	color	inner element background color	n/a
// css-class	string	class name, added to the root HTML element created	n/a
// fluid-on-mobile	string	if "true", will be full width on mobile even if width is set	n/a
// height	px	image height	auto
// href	url	link to redirect to on click	n/a
// name	string	specify the link name attribute	n/a
// padding	px	supports up to 4 parameters	10px 25px
// padding-bottom	px	bottom offset	n/a
// padding-left	px	left offset	n/a
// padding-right	px	right offset	n/a
// padding-top	px	top offset	n/a
// rel	string	specify the rel attribute	n/a
// sizes	media query & width	set width based on query	n/a
// src	url	image source	n/a
// srcset	url & width	enables to set a different image source based on the viewport	n/a
// target	string	link target on click	_blank
// title	string	tooltip & accessibility	n/a
// usemap	string	reference to image map, be careful, it isn't supported everywhere	n/a
// width	px	image width