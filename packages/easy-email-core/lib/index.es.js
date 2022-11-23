var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import React, { useContext, useMemo } from "react";
import { unescape, omit, merge, isObject as isObject$6, isString, mergeWith, isArray as isArray$4, set, get, pickBy, identity, isNumber } from "lodash";
import { renderToStaticMarkup } from "react-dom/server";
import mjml from "mjml-browser";
var BasicType;
(function(BasicType2) {
  BasicType2["PAGE"] = "page";
  BasicType2["SECTION"] = "section";
  BasicType2["COLUMN"] = "column";
  BasicType2["GROUP"] = "group";
  BasicType2["TEXT"] = "text";
  BasicType2["IMAGE"] = "image";
  BasicType2["DIVIDER"] = "divider";
  BasicType2["SPACER"] = "spacer";
  BasicType2["BUTTON"] = "button";
  BasicType2["WRAPPER"] = "wrapper";
  BasicType2["RAW"] = "raw";
  BasicType2["ACCORDION"] = "accordion";
  BasicType2["ACCORDION_ELEMENT"] = "accordion-element";
  BasicType2["ACCORDION_TITLE"] = "accordion-title";
  BasicType2["ACCORDION_TEXT"] = "accordion-text";
  BasicType2["HERO"] = "hero";
  BasicType2["CAROUSEL"] = "carousel";
  BasicType2["NAVBAR"] = "navbar";
  BasicType2["SOCIAL"] = "social";
  BasicType2["TABLE"] = "table";
  BasicType2["TEMPLATE"] = "template";
})(BasicType || (BasicType = {}));
var AdvancedType;
(function(AdvancedType2) {
  AdvancedType2["TEXT"] = "advanced_text";
  AdvancedType2["IMAGE"] = "advanced_image";
  AdvancedType2["DIVIDER"] = "advanced_divider";
  AdvancedType2["SPACER"] = "advanced_spacer";
  AdvancedType2["BUTTON"] = "advanced_button";
  AdvancedType2["NAVBAR"] = "advanced_navbar";
  AdvancedType2["SOCIAL"] = "advanced_social";
  AdvancedType2["ACCORDION"] = "advanced_accordion";
  AdvancedType2["CAROUSEL"] = "advanced_carousel";
  AdvancedType2["WRAPPER"] = "advanced_wrapper";
  AdvancedType2["SECTION"] = "advanced_section";
  AdvancedType2["COLUMN"] = "advanced_column";
  AdvancedType2["GROUP"] = "advanced_group";
  AdvancedType2["HERO"] = "advanced_hero";
})(AdvancedType || (AdvancedType = {}));
const MERGE_TAG_CLASS_NAME = "easy-email-merge-tag-container";
const EMAIL_BLOCK_CLASS_NAME = "email-block";
function createBlock(block) {
  return __spreadValues({}, block);
}
class ImageManager {
  static add(imgMap) {
    Object.keys(imgMap).forEach((name) => {
      if (this.map[name]) {
        this.overrideMap[name] = true;
      }
      this.map[name] = imgMap[name];
    });
  }
  static get(name) {
    return this.map[name];
  }
  static getOverrideMap() {
    return this.overrideMap;
  }
}
__publicField(ImageManager, "map", {});
__publicField(ImageManager, "overrideMap", {});
const defaultImagesMap = {
  IMAGE_01: "https://easy-email-m-ryan.vercel.app/images/ffddc3db-3aae-4d73-ac9c-e1263641f7b4-03c89c34-49a4-4d45-b289-4d2261158cbe.png",
  IMAGE_02: "https://easy-email-m-ryan.vercel.app/images/acbae5eb-efa4-4eb6-866c-f421e740b713-ad3c92b1-9cdb-4a7b-aad3-75ad809db8a3.png",
  IMAGE_03: "https://easy-email-m-ryan.vercel.app/images/98520d6c-5cef-449e-bcbf-6316ccec2088-e8780361-0deb-4896-895e-e690c886cdf0.png",
  IMAGE_04: "https://easy-email-m-ryan.vercel.app/images/b064f705-34ba-4400-975e-9dd0cec21c30-cc9aa158-56bd-4bf1-b532-72390d25c864.png",
  IMAGE_59: "https://easy-email-m-ryan.vercel.app/images/8e0e07e2-3f84-4426-84c1-2add355c558b-image.png",
  IMAGE_09: "https://easy-email-m-ryan.vercel.app/images/be34fb18-32ad-441c-84d8-3c0e9ba9f742-ad2ea5ff-5d0b-446b-bd7d-8e2ab5afdd16.png",
  IMAGE_10: "https://easy-email-m-ryan.vercel.app/images/6a1e6292-469e-452a-bbae-44e4b5ff7463-05e543b6-c951-44ce-ae27-ca1282c77f52.png",
  IMAGE_15: "https://easy-email-m-ryan.vercel.app/images/f69f48af-5b15-40aa-91c4-81d601d1357b-083dc99d-02a6-40d9-ae28-0662bd078b5d.png",
  IMAGE_16: "https://easy-email-m-ryan.vercel.app/images/9cce6b16-5a98-4ddb-b1a1-6cec2cf56891-c3acb856-8ab8-4cfb-93f9-2a0747678b8b.png",
  IMAGE_17: "https://easy-email-m-ryan.vercel.app/images/d9795c1d-fa32-4adb-ab25-30b7cfe87936-df21314f-6f05-4550-80b3-9ab1107e8fbe.png",
  IMAGE_31: "https://easy-email-m-ryan.vercel.app/images/dd1584fb-cb60-42c9-80c7-5545e16130ca-226ba72b-ce9e-4948-ad0d-347381fb96c5.png"
};
ImageManager.add(defaultImagesMap);
function getImg(name) {
  return ImageManager.get(name);
}
function getPlaceholder(params) {
  const { data: { type }, mode } = params;
  if (mode === "production")
    return null;
  let text = null;
  if (type === BasicType.PAGE) {
    text = "Drop a Wrapper block here";
  } else if (type === BasicType.WRAPPER || type === AdvancedType.WRAPPER) {
    text = "Drop a Section block here";
  } else if (type === BasicType.SECTION || type === BasicType.GROUP || type === AdvancedType.SECTION || type === AdvancedType.GROUP) {
    text = "Drop a Column block here";
  } else if (type === BasicType.COLUMN || type === AdvancedType.COLUMN) {
    text = "Drop a content block here";
  }
  if (!text)
    return null;
  return `
   <mj-text color="#666">
    <div style="text-align: center">
      <div>
        <svg width="300" fill="currentColor" style="max-width: 100%;" viewBox="-20 -5 80 60">
          <g>
            <path d="M23.713 23.475h5.907c.21 0 .38.17.38.38v.073c0 .21-.17.38-.38.38h-5.907a.38.38 0 0 1-.38-.38v-.073c0-.21.17-.38.38-.38zm.037-2.917h9.167a.417.417 0 0 1 0 .834H23.75a.417.417 0 0 1 0-.834zm0-2.5h9.167a.417.417 0 0 1 0 .834H23.75a.417.417 0 0 1 0-.834zm-.037-3.333h5.907c.21 0 .38.17.38.38v.073c0 .21-.17.38-.38.38h-5.907a.38.38 0 0 1-.38-.38v-.073c0-.21.17-.38.38-.38zm.037-2.917h9.167a.417.417 0 0 1 0 .834H23.75a.417.417 0 0 1 0-.834zm0-2.916h9.167a.417.417 0 0 1 0 .833H23.75a.417.417 0 0 1 0-.833zm-3.592 8.75a.675.675 0 0 1 .675.691v6.142c0 .374-.3.679-.675.683h-6.15a.683.683 0 0 1-.675-.683v-6.142a.675.675 0 0 1 .675-.691h6.15zM20 24.308v-5.833h-5.833v5.833H20zm.158-15.833a.675.675 0 0 1 .675.692v6.141c0 .374-.3.68-.675.684h-6.15a.683.683 0 0 1-.675-.684V9.167a.675.675 0 0 1 .675-.692h6.15zM20 15.142V9.308h-5.833v5.834H20zM37.167 0A2.809 2.809 0 0 1 40 2.833V30.5a2.809 2.809 0 0 1-2.833 2.833h-3.834v3H32.5v-3h-23A2.808 2.808 0 0 1 6.667 30.5v-23H3.583v-.833h3.084V2.833A2.808 2.808 0 0 1 9.5 0h27.667zm2 30.5V2.833a2.025 2.025 0 0 0-2-2H9.5a2.025 2.025 0 0 0-2 2V30.5a2.025 2.025 0 0 0 2 2h27.667a2.025 2.025 0 0 0 2-2zM0 27.75h.833V31H0v-3.25zm0-13h.833V18H0v-3.25zm0 22.833V34.25h.833v3.25L0 37.583zM0 21.25h.833v3.25H0v-3.25zM2.583 40l.084-.833h3.166V40h-3.25zm27.917-.833c.376.006.748-.08 1.083-.25l.417.666a2.875 2.875 0 0 1-1.5.417h-1.833v-.833H30.5zm-8.333 0h3.25V40h-3.25v-.833zm-6.584 0h3.25V40h-3.25v-.833zm-6.5 0h3.25V40h-3.25v-.833zM0 9.5c.01-.5.154-.99.417-1.417l.666.417c-.17.305-.256.65-.25 1v2H0v-2z"></path>
          </g>
          <text x="-16" y="50" font-size="5px">${text}</text>
        </svg>
      </div>
    </div>
   </mj-text>
  `;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var js = { exports: {} };
var src = {};
var javascript = { exports: {} };
var beautifier$2 = {};
var output = {};
function OutputLine(parent) {
  this.__parent = parent;
  this.__character_count = 0;
  this.__indent_count = -1;
  this.__alignment_count = 0;
  this.__wrap_point_index = 0;
  this.__wrap_point_character_count = 0;
  this.__wrap_point_indent_count = -1;
  this.__wrap_point_alignment_count = 0;
  this.__items = [];
}
OutputLine.prototype.clone_empty = function() {
  var line = new OutputLine(this.__parent);
  line.set_indent(this.__indent_count, this.__alignment_count);
  return line;
};
OutputLine.prototype.item = function(index2) {
  if (index2 < 0) {
    return this.__items[this.__items.length + index2];
  } else {
    return this.__items[index2];
  }
};
OutputLine.prototype.has_match = function(pattern2) {
  for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
    if (this.__items[lastCheckedOutput].match(pattern2)) {
      return true;
    }
  }
  return false;
};
OutputLine.prototype.set_indent = function(indent, alignment) {
  if (this.is_empty()) {
    this.__indent_count = indent || 0;
    this.__alignment_count = alignment || 0;
    this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
  }
};
OutputLine.prototype._set_wrap_point = function() {
  if (this.__parent.wrap_line_length) {
    this.__wrap_point_index = this.__items.length;
    this.__wrap_point_character_count = this.__character_count;
    this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
    this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
  }
};
OutputLine.prototype._should_wrap = function() {
  return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
};
OutputLine.prototype._allow_wrap = function() {
  if (this._should_wrap()) {
    this.__parent.add_new_line();
    var next = this.__parent.current_line;
    next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
    next.__items = this.__items.slice(this.__wrap_point_index);
    this.__items = this.__items.slice(0, this.__wrap_point_index);
    next.__character_count += this.__character_count - this.__wrap_point_character_count;
    this.__character_count = this.__wrap_point_character_count;
    if (next.__items[0] === " ") {
      next.__items.splice(0, 1);
      next.__character_count -= 1;
    }
    return true;
  }
  return false;
};
OutputLine.prototype.is_empty = function() {
  return this.__items.length === 0;
};
OutputLine.prototype.last = function() {
  if (!this.is_empty()) {
    return this.__items[this.__items.length - 1];
  } else {
    return null;
  }
};
OutputLine.prototype.push = function(item) {
  this.__items.push(item);
  var last_newline_index = item.lastIndexOf("\n");
  if (last_newline_index !== -1) {
    this.__character_count = item.length - last_newline_index;
  } else {
    this.__character_count += item.length;
  }
};
OutputLine.prototype.pop = function() {
  var item = null;
  if (!this.is_empty()) {
    item = this.__items.pop();
    this.__character_count -= item.length;
  }
  return item;
};
OutputLine.prototype._remove_indent = function() {
  if (this.__indent_count > 0) {
    this.__indent_count -= 1;
    this.__character_count -= this.__parent.indent_size;
  }
};
OutputLine.prototype._remove_wrap_indent = function() {
  if (this.__wrap_point_indent_count > 0) {
    this.__wrap_point_indent_count -= 1;
  }
};
OutputLine.prototype.trim = function() {
  while (this.last() === " ") {
    this.__items.pop();
    this.__character_count -= 1;
  }
};
OutputLine.prototype.toString = function() {
  var result = "";
  if (this.is_empty()) {
    if (this.__parent.indent_empty_lines) {
      result = this.__parent.get_indent_string(this.__indent_count);
    }
  } else {
    result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
    result += this.__items.join("");
  }
  return result;
};
function IndentStringCache(options2, baseIndentString) {
  this.__cache = [""];
  this.__indent_size = options2.indent_size;
  this.__indent_string = options2.indent_char;
  if (!options2.indent_with_tabs) {
    this.__indent_string = new Array(options2.indent_size + 1).join(options2.indent_char);
  }
  baseIndentString = baseIndentString || "";
  if (options2.indent_level > 0) {
    baseIndentString = new Array(options2.indent_level + 1).join(this.__indent_string);
  }
  this.__base_string = baseIndentString;
  this.__base_string_length = baseIndentString.length;
}
IndentStringCache.prototype.get_indent_size = function(indent, column) {
  var result = this.__base_string_length;
  column = column || 0;
  if (indent < 0) {
    result = 0;
  }
  result += indent * this.__indent_size;
  result += column;
  return result;
};
IndentStringCache.prototype.get_indent_string = function(indent_level, column) {
  var result = this.__base_string;
  column = column || 0;
  if (indent_level < 0) {
    indent_level = 0;
    result = "";
  }
  column += indent_level * this.__indent_size;
  this.__ensure_cache(column);
  result += this.__cache[column];
  return result;
};
IndentStringCache.prototype.__ensure_cache = function(column) {
  while (column >= this.__cache.length) {
    this.__add_column();
  }
};
IndentStringCache.prototype.__add_column = function() {
  var column = this.__cache.length;
  var indent = 0;
  var result = "";
  if (this.__indent_size && column >= this.__indent_size) {
    indent = Math.floor(column / this.__indent_size);
    column -= indent * this.__indent_size;
    result = new Array(indent + 1).join(this.__indent_string);
  }
  if (column) {
    result += new Array(column + 1).join(" ");
  }
  this.__cache.push(result);
};
function Output$3(options2, baseIndentString) {
  this.__indent_cache = new IndentStringCache(options2, baseIndentString);
  this.raw = false;
  this._end_with_newline = options2.end_with_newline;
  this.indent_size = options2.indent_size;
  this.wrap_line_length = options2.wrap_line_length;
  this.indent_empty_lines = options2.indent_empty_lines;
  this.__lines = [];
  this.previous_line = null;
  this.current_line = null;
  this.next_line = new OutputLine(this);
  this.space_before_token = false;
  this.non_breaking_space = false;
  this.previous_token_wrapped = false;
  this.__add_outputline();
}
Output$3.prototype.__add_outputline = function() {
  this.previous_line = this.current_line;
  this.current_line = this.next_line.clone_empty();
  this.__lines.push(this.current_line);
};
Output$3.prototype.get_line_number = function() {
  return this.__lines.length;
};
Output$3.prototype.get_indent_string = function(indent, column) {
  return this.__indent_cache.get_indent_string(indent, column);
};
Output$3.prototype.get_indent_size = function(indent, column) {
  return this.__indent_cache.get_indent_size(indent, column);
};
Output$3.prototype.is_empty = function() {
  return !this.previous_line && this.current_line.is_empty();
};
Output$3.prototype.add_new_line = function(force_newline) {
  if (this.is_empty() || !force_newline && this.just_added_newline()) {
    return false;
  }
  if (!this.raw) {
    this.__add_outputline();
  }
  return true;
};
Output$3.prototype.get_code = function(eol) {
  this.trim(true);
  var last_item = this.current_line.pop();
  if (last_item) {
    if (last_item[last_item.length - 1] === "\n") {
      last_item = last_item.replace(/\n+$/g, "");
    }
    this.current_line.push(last_item);
  }
  if (this._end_with_newline) {
    this.__add_outputline();
  }
  var sweet_code = this.__lines.join("\n");
  if (eol !== "\n") {
    sweet_code = sweet_code.replace(/[\n]/g, eol);
  }
  return sweet_code;
};
Output$3.prototype.set_wrap_point = function() {
  this.current_line._set_wrap_point();
};
Output$3.prototype.set_indent = function(indent, alignment) {
  indent = indent || 0;
  alignment = alignment || 0;
  this.next_line.set_indent(indent, alignment);
  if (this.__lines.length > 1) {
    this.current_line.set_indent(indent, alignment);
    return true;
  }
  this.current_line.set_indent();
  return false;
};
Output$3.prototype.add_raw_token = function(token2) {
  for (var x = 0; x < token2.newlines; x++) {
    this.__add_outputline();
  }
  this.current_line.set_indent(-1);
  this.current_line.push(token2.whitespace_before);
  this.current_line.push(token2.text);
  this.space_before_token = false;
  this.non_breaking_space = false;
  this.previous_token_wrapped = false;
};
Output$3.prototype.add_token = function(printable_token) {
  this.__add_space_before_token();
  this.current_line.push(printable_token);
  this.space_before_token = false;
  this.non_breaking_space = false;
  this.previous_token_wrapped = this.current_line._allow_wrap();
};
Output$3.prototype.__add_space_before_token = function() {
  if (this.space_before_token && !this.just_added_newline()) {
    if (!this.non_breaking_space) {
      this.set_wrap_point();
    }
    this.current_line.push(" ");
  }
};
Output$3.prototype.remove_indent = function(index2) {
  var output_length = this.__lines.length;
  while (index2 < output_length) {
    this.__lines[index2]._remove_indent();
    index2++;
  }
  this.current_line._remove_wrap_indent();
};
Output$3.prototype.trim = function(eat_newlines) {
  eat_newlines = eat_newlines === void 0 ? false : eat_newlines;
  this.current_line.trim();
  while (eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()) {
    this.__lines.pop();
    this.current_line = this.__lines[this.__lines.length - 1];
    this.current_line.trim();
  }
  this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
};
Output$3.prototype.just_added_newline = function() {
  return this.current_line.is_empty();
};
Output$3.prototype.just_added_blankline = function() {
  return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
};
Output$3.prototype.ensure_empty_line_above = function(starts_with, ends_with) {
  var index2 = this.__lines.length - 2;
  while (index2 >= 0) {
    var potentialEmptyLine = this.__lines[index2];
    if (potentialEmptyLine.is_empty()) {
      break;
    } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
      this.__lines.splice(index2 + 1, 0, new OutputLine(this));
      this.previous_line = this.__lines[this.__lines.length - 2];
      break;
    }
    index2--;
  }
};
output.Output = Output$3;
var token = {};
function Token$2(type, text, newlines, whitespace_before) {
  this.type = type;
  this.text = text;
  this.comments_before = null;
  this.newlines = newlines || 0;
  this.whitespace_before = whitespace_before || "";
  this.parent = null;
  this.next = null;
  this.previous = null;
  this.opened = null;
  this.closed = null;
  this.directives = null;
}
token.Token = Token$2;
var acorn$2 = {};
(function(exports) {
  var baseASCIIidentifierStartChars = "\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a";
  var baseASCIIidentifierChars = "\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a";
  var nonASCIIidentifierStartChars = "\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc";
  var nonASCIIidentifierChars = "\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f";
  var identifierStart = "(?:\\\\u[0-9a-fA-F]{4}|[" + baseASCIIidentifierStartChars + nonASCIIidentifierStartChars + "])";
  var identifierChars = "(?:\\\\u[0-9a-fA-F]{4}|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])*";
  exports.identifier = new RegExp(identifierStart + identifierChars, "g");
  exports.identifierStart = new RegExp(identifierStart);
  exports.identifierMatch = new RegExp("(?:\\\\u[0-9a-fA-F]{4}|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])+");
  exports.newline = /[\n\r\u2028\u2029]/;
  exports.lineBreak = new RegExp("\r\n|" + exports.newline.source);
  exports.allLineBreaks = new RegExp(exports.lineBreak.source, "g");
})(acorn$2);
var options$3 = {};
var options$2 = {};
function Options$9(options2, merge_child_field) {
  this.raw_options = _mergeOpts(options2, merge_child_field);
  this.disabled = this._get_boolean("disabled");
  this.eol = this._get_characters("eol", "auto");
  this.end_with_newline = this._get_boolean("end_with_newline");
  this.indent_size = this._get_number("indent_size", 4);
  this.indent_char = this._get_characters("indent_char", " ");
  this.indent_level = this._get_number("indent_level");
  this.preserve_newlines = this._get_boolean("preserve_newlines", true);
  this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786);
  if (!this.preserve_newlines) {
    this.max_preserve_newlines = 0;
  }
  this.indent_with_tabs = this._get_boolean("indent_with_tabs", this.indent_char === "	");
  if (this.indent_with_tabs) {
    this.indent_char = "	";
    if (this.indent_size === 1) {
      this.indent_size = 4;
    }
  }
  this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char"));
  this.indent_empty_lines = this._get_boolean("indent_empty_lines");
  this.templating = this._get_selection_list("templating", ["auto", "none", "django", "erb", "handlebars", "php", "smarty"], ["auto"]);
}
Options$9.prototype._get_array = function(name, default_value) {
  var option_value = this.raw_options[name];
  var result = default_value || [];
  if (typeof option_value === "object") {
    if (option_value !== null && typeof option_value.concat === "function") {
      result = option_value.concat();
    }
  } else if (typeof option_value === "string") {
    result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
  }
  return result;
};
Options$9.prototype._get_boolean = function(name, default_value) {
  var option_value = this.raw_options[name];
  var result = option_value === void 0 ? !!default_value : !!option_value;
  return result;
};
Options$9.prototype._get_characters = function(name, default_value) {
  var option_value = this.raw_options[name];
  var result = default_value || "";
  if (typeof option_value === "string") {
    result = option_value.replace(/\\r/, "\r").replace(/\\n/, "\n").replace(/\\t/, "	");
  }
  return result;
};
Options$9.prototype._get_number = function(name, default_value) {
  var option_value = this.raw_options[name];
  default_value = parseInt(default_value, 10);
  if (isNaN(default_value)) {
    default_value = 0;
  }
  var result = parseInt(option_value, 10);
  if (isNaN(result)) {
    result = default_value;
  }
  return result;
};
Options$9.prototype._get_selection = function(name, selection_list, default_value) {
  var result = this._get_selection_list(name, selection_list, default_value);
  if (result.length !== 1) {
    throw new Error("Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
  }
  return result[0];
};
Options$9.prototype._get_selection_list = function(name, selection_list, default_value) {
  if (!selection_list || selection_list.length === 0) {
    throw new Error("Selection list cannot be empty.");
  }
  default_value = default_value || [selection_list[0]];
  if (!this._is_valid_selection(default_value, selection_list)) {
    throw new Error("Invalid Default Value!");
  }
  var result = this._get_array(name, default_value);
  if (!this._is_valid_selection(result, selection_list)) {
    throw new Error("Invalid Option Value: The option '" + name + "' can contain only the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
  }
  return result;
};
Options$9.prototype._is_valid_selection = function(result, selection_list) {
  return result.length && selection_list.length && !result.some(function(item) {
    return selection_list.indexOf(item) === -1;
  });
};
function _mergeOpts(allOptions, childFieldName) {
  var finalOpts = {};
  allOptions = _normalizeOpts(allOptions);
  var name;
  for (name in allOptions) {
    if (name !== childFieldName) {
      finalOpts[name] = allOptions[name];
    }
  }
  if (childFieldName && allOptions[childFieldName]) {
    for (name in allOptions[childFieldName]) {
      finalOpts[name] = allOptions[childFieldName][name];
    }
  }
  return finalOpts;
}
function _normalizeOpts(options2) {
  var convertedOpts = {};
  var key;
  for (key in options2) {
    var newKey = key.replace(/-/g, "_");
    convertedOpts[newKey] = options2[key];
  }
  return convertedOpts;
}
options$2.Options = Options$9;
options$2.normalizeOpts = _normalizeOpts;
options$2.mergeOpts = _mergeOpts;
var BaseOptions$2 = options$2.Options;
var validPositionValues$1 = ["before-newline", "after-newline", "preserve-newline"];
function Options$8(options2) {
  BaseOptions$2.call(this, options2, "js");
  var raw_brace_style = this.raw_options.brace_style || null;
  if (raw_brace_style === "expand-strict") {
    this.raw_options.brace_style = "expand";
  } else if (raw_brace_style === "collapse-preserve-inline") {
    this.raw_options.brace_style = "collapse,preserve-inline";
  } else if (this.raw_options.braces_on_own_line !== void 0) {
    this.raw_options.brace_style = this.raw_options.braces_on_own_line ? "expand" : "collapse";
  }
  var brace_style_split = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
  this.brace_preserve_inline = false;
  this.brace_style = "collapse";
  for (var bs = 0; bs < brace_style_split.length; bs++) {
    if (brace_style_split[bs] === "preserve-inline") {
      this.brace_preserve_inline = true;
    } else {
      this.brace_style = brace_style_split[bs];
    }
  }
  this.unindent_chained_methods = this._get_boolean("unindent_chained_methods");
  this.break_chained_methods = this._get_boolean("break_chained_methods");
  this.space_in_paren = this._get_boolean("space_in_paren");
  this.space_in_empty_paren = this._get_boolean("space_in_empty_paren");
  this.jslint_happy = this._get_boolean("jslint_happy");
  this.space_after_anon_function = this._get_boolean("space_after_anon_function");
  this.space_after_named_function = this._get_boolean("space_after_named_function");
  this.keep_array_indentation = this._get_boolean("keep_array_indentation");
  this.space_before_conditional = this._get_boolean("space_before_conditional", true);
  this.unescape_strings = this._get_boolean("unescape_strings");
  this.e4x = this._get_boolean("e4x");
  this.comma_first = this._get_boolean("comma_first");
  this.operator_position = this._get_selection("operator_position", validPositionValues$1);
  this.test_output_raw = this._get_boolean("test_output_raw");
  if (this.jslint_happy) {
    this.space_after_anon_function = true;
  }
}
Options$8.prototype = new BaseOptions$2();
options$3.Options = Options$8;
var tokenizer$2 = {};
var inputscanner = {};
var regexp_has_sticky = RegExp.prototype.hasOwnProperty("sticky");
function InputScanner$3(input_string) {
  this.__input = input_string || "";
  this.__input_length = this.__input.length;
  this.__position = 0;
}
InputScanner$3.prototype.restart = function() {
  this.__position = 0;
};
InputScanner$3.prototype.back = function() {
  if (this.__position > 0) {
    this.__position -= 1;
  }
};
InputScanner$3.prototype.hasNext = function() {
  return this.__position < this.__input_length;
};
InputScanner$3.prototype.next = function() {
  var val = null;
  if (this.hasNext()) {
    val = this.__input.charAt(this.__position);
    this.__position += 1;
  }
  return val;
};
InputScanner$3.prototype.peek = function(index2) {
  var val = null;
  index2 = index2 || 0;
  index2 += this.__position;
  if (index2 >= 0 && index2 < this.__input_length) {
    val = this.__input.charAt(index2);
  }
  return val;
};
InputScanner$3.prototype.__match = function(pattern2, index2) {
  pattern2.lastIndex = index2;
  var pattern_match = pattern2.exec(this.__input);
  if (pattern_match && !(regexp_has_sticky && pattern2.sticky)) {
    if (pattern_match.index !== index2) {
      pattern_match = null;
    }
  }
  return pattern_match;
};
InputScanner$3.prototype.test = function(pattern2, index2) {
  index2 = index2 || 0;
  index2 += this.__position;
  if (index2 >= 0 && index2 < this.__input_length) {
    return !!this.__match(pattern2, index2);
  } else {
    return false;
  }
};
InputScanner$3.prototype.testChar = function(pattern2, index2) {
  var val = this.peek(index2);
  pattern2.lastIndex = 0;
  return val !== null && pattern2.test(val);
};
InputScanner$3.prototype.match = function(pattern2) {
  var pattern_match = this.__match(pattern2, this.__position);
  if (pattern_match) {
    this.__position += pattern_match[0].length;
  } else {
    pattern_match = null;
  }
  return pattern_match;
};
InputScanner$3.prototype.read = function(starting_pattern, until_pattern, until_after) {
  var val = "";
  var match;
  if (starting_pattern) {
    match = this.match(starting_pattern);
    if (match) {
      val += match[0];
    }
  }
  if (until_pattern && (match || !starting_pattern)) {
    val += this.readUntil(until_pattern, until_after);
  }
  return val;
};
InputScanner$3.prototype.readUntil = function(pattern2, until_after) {
  var val = "";
  var match_index = this.__position;
  pattern2.lastIndex = this.__position;
  var pattern_match = pattern2.exec(this.__input);
  if (pattern_match) {
    match_index = pattern_match.index;
    if (until_after) {
      match_index += pattern_match[0].length;
    }
  } else {
    match_index = this.__input_length;
  }
  val = this.__input.substring(this.__position, match_index);
  this.__position = match_index;
  return val;
};
InputScanner$3.prototype.readUntilAfter = function(pattern2) {
  return this.readUntil(pattern2, true);
};
InputScanner$3.prototype.get_regexp = function(pattern2, match_from) {
  var result = null;
  var flags = "g";
  if (match_from && regexp_has_sticky) {
    flags = "y";
  }
  if (typeof pattern2 === "string" && pattern2 !== "") {
    result = new RegExp(pattern2, flags);
  } else if (pattern2) {
    result = new RegExp(pattern2.source, flags);
  }
  return result;
};
InputScanner$3.prototype.get_literal_regexp = function(literal_string) {
  return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
};
InputScanner$3.prototype.peekUntilAfter = function(pattern2) {
  var start = this.__position;
  var val = this.readUntilAfter(pattern2);
  this.__position = start;
  return val;
};
InputScanner$3.prototype.lookBack = function(testVal) {
  var start = this.__position - 1;
  return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
};
inputscanner.InputScanner = InputScanner$3;
var tokenizer$1 = {};
var tokenstream = {};
function TokenStream$1(parent_token) {
  this.__tokens = [];
  this.__tokens_length = this.__tokens.length;
  this.__position = 0;
  this.__parent_token = parent_token;
}
TokenStream$1.prototype.restart = function() {
  this.__position = 0;
};
TokenStream$1.prototype.isEmpty = function() {
  return this.__tokens_length === 0;
};
TokenStream$1.prototype.hasNext = function() {
  return this.__position < this.__tokens_length;
};
TokenStream$1.prototype.next = function() {
  var val = null;
  if (this.hasNext()) {
    val = this.__tokens[this.__position];
    this.__position += 1;
  }
  return val;
};
TokenStream$1.prototype.peek = function(index2) {
  var val = null;
  index2 = index2 || 0;
  index2 += this.__position;
  if (index2 >= 0 && index2 < this.__tokens_length) {
    val = this.__tokens[index2];
  }
  return val;
};
TokenStream$1.prototype.add = function(token2) {
  if (this.__parent_token) {
    token2.parent = this.__parent_token;
  }
  this.__tokens.push(token2);
  this.__tokens_length += 1;
};
tokenstream.TokenStream = TokenStream$1;
var whitespacepattern = {};
var pattern = {};
function Pattern$4(input_scanner, parent) {
  this._input = input_scanner;
  this._starting_pattern = null;
  this._match_pattern = null;
  this._until_pattern = null;
  this._until_after = false;
  if (parent) {
    this._starting_pattern = this._input.get_regexp(parent._starting_pattern, true);
    this._match_pattern = this._input.get_regexp(parent._match_pattern, true);
    this._until_pattern = this._input.get_regexp(parent._until_pattern);
    this._until_after = parent._until_after;
  }
}
Pattern$4.prototype.read = function() {
  var result = this._input.read(this._starting_pattern);
  if (!this._starting_pattern || result) {
    result += this._input.read(this._match_pattern, this._until_pattern, this._until_after);
  }
  return result;
};
Pattern$4.prototype.read_match = function() {
  return this._input.match(this._match_pattern);
};
Pattern$4.prototype.until_after = function(pattern2) {
  var result = this._create();
  result._until_after = true;
  result._until_pattern = this._input.get_regexp(pattern2);
  result._update();
  return result;
};
Pattern$4.prototype.until = function(pattern2) {
  var result = this._create();
  result._until_after = false;
  result._until_pattern = this._input.get_regexp(pattern2);
  result._update();
  return result;
};
Pattern$4.prototype.starting_with = function(pattern2) {
  var result = this._create();
  result._starting_pattern = this._input.get_regexp(pattern2, true);
  result._update();
  return result;
};
Pattern$4.prototype.matching = function(pattern2) {
  var result = this._create();
  result._match_pattern = this._input.get_regexp(pattern2, true);
  result._update();
  return result;
};
Pattern$4.prototype._create = function() {
  return new Pattern$4(this._input, this);
};
Pattern$4.prototype._update = function() {
};
pattern.Pattern = Pattern$4;
var Pattern$3 = pattern.Pattern;
function WhitespacePattern$1(input_scanner, parent) {
  Pattern$3.call(this, input_scanner, parent);
  if (parent) {
    this._line_regexp = this._input.get_regexp(parent._line_regexp);
  } else {
    this.__set_whitespace_patterns("", "");
  }
  this.newline_count = 0;
  this.whitespace_before_token = "";
}
WhitespacePattern$1.prototype = new Pattern$3();
WhitespacePattern$1.prototype.__set_whitespace_patterns = function(whitespace_chars, newline_chars) {
  whitespace_chars += "\\t ";
  newline_chars += "\\n\\r";
  this._match_pattern = this._input.get_regexp("[" + whitespace_chars + newline_chars + "]+", true);
  this._newline_regexp = this._input.get_regexp("\\r\\n|[" + newline_chars + "]");
};
WhitespacePattern$1.prototype.read = function() {
  this.newline_count = 0;
  this.whitespace_before_token = "";
  var resulting_string = this._input.read(this._match_pattern);
  if (resulting_string === " ") {
    this.whitespace_before_token = " ";
  } else if (resulting_string) {
    var matches = this.__split(this._newline_regexp, resulting_string);
    this.newline_count = matches.length - 1;
    this.whitespace_before_token = matches[this.newline_count];
  }
  return resulting_string;
};
WhitespacePattern$1.prototype.matching = function(whitespace_chars, newline_chars) {
  var result = this._create();
  result.__set_whitespace_patterns(whitespace_chars, newline_chars);
  result._update();
  return result;
};
WhitespacePattern$1.prototype._create = function() {
  return new WhitespacePattern$1(this._input, this);
};
WhitespacePattern$1.prototype.__split = function(regexp, input_string) {
  regexp.lastIndex = 0;
  var start_index = 0;
  var result = [];
  var next_match = regexp.exec(input_string);
  while (next_match) {
    result.push(input_string.substring(start_index, next_match.index));
    start_index = next_match.index + next_match[0].length;
    next_match = regexp.exec(input_string);
  }
  if (start_index < input_string.length) {
    result.push(input_string.substring(start_index, input_string.length));
  } else {
    result.push("");
  }
  return result;
};
whitespacepattern.WhitespacePattern = WhitespacePattern$1;
var InputScanner$2 = inputscanner.InputScanner;
var Token$1 = token.Token;
var TokenStream = tokenstream.TokenStream;
var WhitespacePattern = whitespacepattern.WhitespacePattern;
var TOKEN$4 = {
  START: "TK_START",
  RAW: "TK_RAW",
  EOF: "TK_EOF"
};
var Tokenizer$4 = function(input_string, options2) {
  this._input = new InputScanner$2(input_string);
  this._options = options2 || {};
  this.__tokens = null;
  this._patterns = {};
  this._patterns.whitespace = new WhitespacePattern(this._input);
};
Tokenizer$4.prototype.tokenize = function() {
  this._input.restart();
  this.__tokens = new TokenStream();
  this._reset();
  var current;
  var previous = new Token$1(TOKEN$4.START, "");
  var open_token = null;
  var open_stack = [];
  var comments = new TokenStream();
  while (previous.type !== TOKEN$4.EOF) {
    current = this._get_next_token(previous, open_token);
    while (this._is_comment(current)) {
      comments.add(current);
      current = this._get_next_token(previous, open_token);
    }
    if (!comments.isEmpty()) {
      current.comments_before = comments;
      comments = new TokenStream();
    }
    current.parent = open_token;
    if (this._is_opening(current)) {
      open_stack.push(open_token);
      open_token = current;
    } else if (open_token && this._is_closing(current, open_token)) {
      current.opened = open_token;
      open_token.closed = current;
      open_token = open_stack.pop();
      current.parent = open_token;
    }
    current.previous = previous;
    previous.next = current;
    this.__tokens.add(current);
    previous = current;
  }
  return this.__tokens;
};
Tokenizer$4.prototype._is_first_token = function() {
  return this.__tokens.isEmpty();
};
Tokenizer$4.prototype._reset = function() {
};
Tokenizer$4.prototype._get_next_token = function(previous_token, open_token) {
  this._readWhitespace();
  var resulting_string = this._input.read(/.+/g);
  if (resulting_string) {
    return this._create_token(TOKEN$4.RAW, resulting_string);
  } else {
    return this._create_token(TOKEN$4.EOF, "");
  }
};
Tokenizer$4.prototype._is_comment = function(current_token) {
  return false;
};
Tokenizer$4.prototype._is_opening = function(current_token) {
  return false;
};
Tokenizer$4.prototype._is_closing = function(current_token, open_token) {
  return false;
};
Tokenizer$4.prototype._create_token = function(type, text) {
  var token2 = new Token$1(type, text, this._patterns.whitespace.newline_count, this._patterns.whitespace.whitespace_before_token);
  return token2;
};
Tokenizer$4.prototype._readWhitespace = function() {
  return this._patterns.whitespace.read();
};
tokenizer$1.Tokenizer = Tokenizer$4;
tokenizer$1.TOKEN = TOKEN$4;
var directives = {};
function Directives$3(start_block_pattern, end_block_pattern) {
  start_block_pattern = typeof start_block_pattern === "string" ? start_block_pattern : start_block_pattern.source;
  end_block_pattern = typeof end_block_pattern === "string" ? end_block_pattern : end_block_pattern.source;
  this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, "g");
  this.__directive_pattern = / (\w+)[:](\w+)/g;
  this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, "g");
}
Directives$3.prototype.get_directives = function(text) {
  if (!text.match(this.__directives_block_pattern)) {
    return null;
  }
  var directives2 = {};
  this.__directive_pattern.lastIndex = 0;
  var directive_match = this.__directive_pattern.exec(text);
  while (directive_match) {
    directives2[directive_match[1]] = directive_match[2];
    directive_match = this.__directive_pattern.exec(text);
  }
  return directives2;
};
Directives$3.prototype.readIgnored = function(input) {
  return input.readUntilAfter(this.__directives_end_ignore_pattern);
};
directives.Directives = Directives$3;
var templatablepattern = {};
var Pattern$2 = pattern.Pattern;
var template_names = {
  django: false,
  erb: false,
  handlebars: false,
  php: false,
  smarty: false
};
function TemplatablePattern$2(input_scanner, parent) {
  Pattern$2.call(this, input_scanner, parent);
  this.__template_pattern = null;
  this._disabled = Object.assign({}, template_names);
  this._excluded = Object.assign({}, template_names);
  if (parent) {
    this.__template_pattern = this._input.get_regexp(parent.__template_pattern);
    this._excluded = Object.assign(this._excluded, parent._excluded);
    this._disabled = Object.assign(this._disabled, parent._disabled);
  }
  var pattern2 = new Pattern$2(input_scanner);
  this.__patterns = {
    handlebars_comment: pattern2.starting_with(/{{!--/).until_after(/--}}/),
    handlebars_unescaped: pattern2.starting_with(/{{{/).until_after(/}}}/),
    handlebars: pattern2.starting_with(/{{/).until_after(/}}/),
    php: pattern2.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
    erb: pattern2.starting_with(/<%[^%]/).until_after(/[^%]%>/),
    django: pattern2.starting_with(/{%/).until_after(/%}/),
    django_value: pattern2.starting_with(/{{/).until_after(/}}/),
    django_comment: pattern2.starting_with(/{#/).until_after(/#}/),
    smarty: pattern2.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
    smarty_comment: pattern2.starting_with(/{\*/).until_after(/\*}/),
    smarty_literal: pattern2.starting_with(/{literal}/).until_after(/{\/literal}/)
  };
}
TemplatablePattern$2.prototype = new Pattern$2();
TemplatablePattern$2.prototype._create = function() {
  return new TemplatablePattern$2(this._input, this);
};
TemplatablePattern$2.prototype._update = function() {
  this.__set_templated_pattern();
};
TemplatablePattern$2.prototype.disable = function(language) {
  var result = this._create();
  result._disabled[language] = true;
  result._update();
  return result;
};
TemplatablePattern$2.prototype.read_options = function(options2) {
  var result = this._create();
  for (var language in template_names) {
    result._disabled[language] = options2.templating.indexOf(language) === -1;
  }
  result._update();
  return result;
};
TemplatablePattern$2.prototype.exclude = function(language) {
  var result = this._create();
  result._excluded[language] = true;
  result._update();
  return result;
};
TemplatablePattern$2.prototype.read = function() {
  var result = "";
  if (this._match_pattern) {
    result = this._input.read(this._starting_pattern);
  } else {
    result = this._input.read(this._starting_pattern, this.__template_pattern);
  }
  var next = this._read_template();
  while (next) {
    if (this._match_pattern) {
      next += this._input.read(this._match_pattern);
    } else {
      next += this._input.readUntil(this.__template_pattern);
    }
    result += next;
    next = this._read_template();
  }
  if (this._until_after) {
    result += this._input.readUntilAfter(this._until_pattern);
  }
  return result;
};
TemplatablePattern$2.prototype.__set_templated_pattern = function() {
  var items = [];
  if (!this._disabled.php) {
    items.push(this.__patterns.php._starting_pattern.source);
  }
  if (!this._disabled.handlebars) {
    items.push(this.__patterns.handlebars._starting_pattern.source);
  }
  if (!this._disabled.erb) {
    items.push(this.__patterns.erb._starting_pattern.source);
  }
  if (!this._disabled.django) {
    items.push(this.__patterns.django._starting_pattern.source);
    items.push(this.__patterns.django_value._starting_pattern.source);
    items.push(this.__patterns.django_comment._starting_pattern.source);
  }
  if (!this._disabled.smarty) {
    items.push(this.__patterns.smarty._starting_pattern.source);
  }
  if (this._until_pattern) {
    items.push(this._until_pattern.source);
  }
  this.__template_pattern = this._input.get_regexp("(?:" + items.join("|") + ")");
};
TemplatablePattern$2.prototype._read_template = function() {
  var resulting_string = "";
  var c = this._input.peek();
  if (c === "<") {
    var peek1 = this._input.peek(1);
    if (!this._disabled.php && !this._excluded.php && peek1 === "?") {
      resulting_string = resulting_string || this.__patterns.php.read();
    }
    if (!this._disabled.erb && !this._excluded.erb && peek1 === "%") {
      resulting_string = resulting_string || this.__patterns.erb.read();
    }
  } else if (c === "{") {
    if (!this._disabled.handlebars && !this._excluded.handlebars) {
      resulting_string = resulting_string || this.__patterns.handlebars_comment.read();
      resulting_string = resulting_string || this.__patterns.handlebars_unescaped.read();
      resulting_string = resulting_string || this.__patterns.handlebars.read();
    }
    if (!this._disabled.django) {
      if (!this._excluded.django && !this._excluded.handlebars) {
        resulting_string = resulting_string || this.__patterns.django_value.read();
      }
      if (!this._excluded.django) {
        resulting_string = resulting_string || this.__patterns.django_comment.read();
        resulting_string = resulting_string || this.__patterns.django.read();
      }
    }
    if (!this._disabled.smarty) {
      if (this._disabled.django && this._disabled.handlebars) {
        resulting_string = resulting_string || this.__patterns.smarty_comment.read();
        resulting_string = resulting_string || this.__patterns.smarty_literal.read();
        resulting_string = resulting_string || this.__patterns.smarty.read();
      }
    }
  }
  return resulting_string;
};
templatablepattern.TemplatablePattern = TemplatablePattern$2;
var InputScanner$1 = inputscanner.InputScanner;
var BaseTokenizer$1 = tokenizer$1.Tokenizer;
var BASETOKEN$1 = tokenizer$1.TOKEN;
var Directives$2 = directives.Directives;
var acorn$1 = acorn$2;
var Pattern$1 = pattern.Pattern;
var TemplatablePattern$1 = templatablepattern.TemplatablePattern;
function in_array$2(what, arr) {
  return arr.indexOf(what) !== -1;
}
var TOKEN$3 = {
  START_EXPR: "TK_START_EXPR",
  END_EXPR: "TK_END_EXPR",
  START_BLOCK: "TK_START_BLOCK",
  END_BLOCK: "TK_END_BLOCK",
  WORD: "TK_WORD",
  RESERVED: "TK_RESERVED",
  SEMICOLON: "TK_SEMICOLON",
  STRING: "TK_STRING",
  EQUALS: "TK_EQUALS",
  OPERATOR: "TK_OPERATOR",
  COMMA: "TK_COMMA",
  BLOCK_COMMENT: "TK_BLOCK_COMMENT",
  COMMENT: "TK_COMMENT",
  DOT: "TK_DOT",
  UNKNOWN: "TK_UNKNOWN",
  START: BASETOKEN$1.START,
  RAW: BASETOKEN$1.RAW,
  EOF: BASETOKEN$1.EOF
};
var directives_core$2 = new Directives$2(/\/\*/, /\*\//);
var number_pattern = /0[xX][0123456789abcdefABCDEF_]*n?|0[oO][01234567_]*n?|0[bB][01_]*n?|\d[\d_]*n|(?:\.\d[\d_]*|\d[\d_]*\.?[\d_]*)(?:[eE][+-]?[\d_]+)?/;
var digit = /[0-9]/;
var dot_pattern = /[^\d\.]/;
var positionable_operators$1 = ">>> === !== &&= ??= ||= << && >= ** != == <= >> || ?? |> < / - + > : & % ? ^ | *".split(" ");
var punct = ">>>= ... >>= <<= === >>> !== **= &&= ??= ||= => ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> = ! ? > < : / ^ - + * & % ~ |";
punct = punct.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
punct = "\\?\\.(?!\\d) " + punct;
punct = punct.replace(/ /g, "|");
var punct_pattern = new RegExp(punct);
var line_starters$1 = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");
var reserved_words = line_starters$1.concat(["do", "in", "of", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await", "from", "as", "class", "extends"]);
var reserved_word_pattern = new RegExp("^(?:" + reserved_words.join("|") + ")$");
var in_html_comment;
var Tokenizer$3 = function(input_string, options2) {
  BaseTokenizer$1.call(this, input_string, options2);
  this._patterns.whitespace = this._patterns.whitespace.matching(/\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source, /\u2028\u2029/.source);
  var pattern_reader = new Pattern$1(this._input);
  var templatable = new TemplatablePattern$1(this._input).read_options(this._options);
  this.__patterns = {
    template: templatable,
    identifier: templatable.starting_with(acorn$1.identifier).matching(acorn$1.identifierMatch),
    number: pattern_reader.matching(number_pattern),
    punct: pattern_reader.matching(punct_pattern),
    comment: pattern_reader.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),
    block_comment: pattern_reader.starting_with(/\/\*/).until_after(/\*\//),
    html_comment_start: pattern_reader.matching(/<!--/),
    html_comment_end: pattern_reader.matching(/-->/),
    include: pattern_reader.starting_with(/#include/).until_after(acorn$1.lineBreak),
    shebang: pattern_reader.starting_with(/#!/).until_after(acorn$1.lineBreak),
    xml: pattern_reader.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[^}]+?}|!\[CDATA\[[^\]]*?\]\]|)(\s*{[^}]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{([^{}]|{[^}]+?})+?}))*\s*(\/?)\s*>/),
    single_quote: templatable.until(/['\\\n\r\u2028\u2029]/),
    double_quote: templatable.until(/["\\\n\r\u2028\u2029]/),
    template_text: templatable.until(/[`\\$]/),
    template_expression: templatable.until(/[`}\\]/)
  };
};
Tokenizer$3.prototype = new BaseTokenizer$1();
Tokenizer$3.prototype._is_comment = function(current_token) {
  return current_token.type === TOKEN$3.COMMENT || current_token.type === TOKEN$3.BLOCK_COMMENT || current_token.type === TOKEN$3.UNKNOWN;
};
Tokenizer$3.prototype._is_opening = function(current_token) {
  return current_token.type === TOKEN$3.START_BLOCK || current_token.type === TOKEN$3.START_EXPR;
};
Tokenizer$3.prototype._is_closing = function(current_token, open_token) {
  return (current_token.type === TOKEN$3.END_BLOCK || current_token.type === TOKEN$3.END_EXPR) && (open_token && (current_token.text === "]" && open_token.text === "[" || current_token.text === ")" && open_token.text === "(" || current_token.text === "}" && open_token.text === "{"));
};
Tokenizer$3.prototype._reset = function() {
  in_html_comment = false;
};
Tokenizer$3.prototype._get_next_token = function(previous_token, open_token) {
  var token2 = null;
  this._readWhitespace();
  var c = this._input.peek();
  if (c === null) {
    return this._create_token(TOKEN$3.EOF, "");
  }
  token2 = token2 || this._read_non_javascript(c);
  token2 = token2 || this._read_string(c);
  token2 = token2 || this._read_word(previous_token);
  token2 = token2 || this._read_singles(c);
  token2 = token2 || this._read_comment(c);
  token2 = token2 || this._read_regexp(c, previous_token);
  token2 = token2 || this._read_xml(c, previous_token);
  token2 = token2 || this._read_punctuation();
  token2 = token2 || this._create_token(TOKEN$3.UNKNOWN, this._input.next());
  return token2;
};
Tokenizer$3.prototype._read_word = function(previous_token) {
  var resulting_string;
  resulting_string = this.__patterns.identifier.read();
  if (resulting_string !== "") {
    resulting_string = resulting_string.replace(acorn$1.allLineBreaks, "\n");
    if (!(previous_token.type === TOKEN$3.DOT || previous_token.type === TOKEN$3.RESERVED && (previous_token.text === "set" || previous_token.text === "get")) && reserved_word_pattern.test(resulting_string)) {
      if ((resulting_string === "in" || resulting_string === "of") && (previous_token.type === TOKEN$3.WORD || previous_token.type === TOKEN$3.STRING)) {
        return this._create_token(TOKEN$3.OPERATOR, resulting_string);
      }
      return this._create_token(TOKEN$3.RESERVED, resulting_string);
    }
    return this._create_token(TOKEN$3.WORD, resulting_string);
  }
  resulting_string = this.__patterns.number.read();
  if (resulting_string !== "") {
    return this._create_token(TOKEN$3.WORD, resulting_string);
  }
};
Tokenizer$3.prototype._read_singles = function(c) {
  var token2 = null;
  if (c === "(" || c === "[") {
    token2 = this._create_token(TOKEN$3.START_EXPR, c);
  } else if (c === ")" || c === "]") {
    token2 = this._create_token(TOKEN$3.END_EXPR, c);
  } else if (c === "{") {
    token2 = this._create_token(TOKEN$3.START_BLOCK, c);
  } else if (c === "}") {
    token2 = this._create_token(TOKEN$3.END_BLOCK, c);
  } else if (c === ";") {
    token2 = this._create_token(TOKEN$3.SEMICOLON, c);
  } else if (c === "." && dot_pattern.test(this._input.peek(1))) {
    token2 = this._create_token(TOKEN$3.DOT, c);
  } else if (c === ",") {
    token2 = this._create_token(TOKEN$3.COMMA, c);
  }
  if (token2) {
    this._input.next();
  }
  return token2;
};
Tokenizer$3.prototype._read_punctuation = function() {
  var resulting_string = this.__patterns.punct.read();
  if (resulting_string !== "") {
    if (resulting_string === "=") {
      return this._create_token(TOKEN$3.EQUALS, resulting_string);
    } else if (resulting_string === "?.") {
      return this._create_token(TOKEN$3.DOT, resulting_string);
    } else {
      return this._create_token(TOKEN$3.OPERATOR, resulting_string);
    }
  }
};
Tokenizer$3.prototype._read_non_javascript = function(c) {
  var resulting_string = "";
  if (c === "#") {
    if (this._is_first_token()) {
      resulting_string = this.__patterns.shebang.read();
      if (resulting_string) {
        return this._create_token(TOKEN$3.UNKNOWN, resulting_string.trim() + "\n");
      }
    }
    resulting_string = this.__patterns.include.read();
    if (resulting_string) {
      return this._create_token(TOKEN$3.UNKNOWN, resulting_string.trim() + "\n");
    }
    c = this._input.next();
    var sharp = "#";
    if (this._input.hasNext() && this._input.testChar(digit)) {
      do {
        c = this._input.next();
        sharp += c;
      } while (this._input.hasNext() && c !== "#" && c !== "=");
      if (c === "#")
        ;
      else if (this._input.peek() === "[" && this._input.peek(1) === "]") {
        sharp += "[]";
        this._input.next();
        this._input.next();
      } else if (this._input.peek() === "{" && this._input.peek(1) === "}") {
        sharp += "{}";
        this._input.next();
        this._input.next();
      }
      return this._create_token(TOKEN$3.WORD, sharp);
    }
    this._input.back();
  } else if (c === "<" && this._is_first_token()) {
    resulting_string = this.__patterns.html_comment_start.read();
    if (resulting_string) {
      while (this._input.hasNext() && !this._input.testChar(acorn$1.newline)) {
        resulting_string += this._input.next();
      }
      in_html_comment = true;
      return this._create_token(TOKEN$3.COMMENT, resulting_string);
    }
  } else if (in_html_comment && c === "-") {
    resulting_string = this.__patterns.html_comment_end.read();
    if (resulting_string) {
      in_html_comment = false;
      return this._create_token(TOKEN$3.COMMENT, resulting_string);
    }
  }
  return null;
};
Tokenizer$3.prototype._read_comment = function(c) {
  var token2 = null;
  if (c === "/") {
    var comment = "";
    if (this._input.peek(1) === "*") {
      comment = this.__patterns.block_comment.read();
      var directives2 = directives_core$2.get_directives(comment);
      if (directives2 && directives2.ignore === "start") {
        comment += directives_core$2.readIgnored(this._input);
      }
      comment = comment.replace(acorn$1.allLineBreaks, "\n");
      token2 = this._create_token(TOKEN$3.BLOCK_COMMENT, comment);
      token2.directives = directives2;
    } else if (this._input.peek(1) === "/") {
      comment = this.__patterns.comment.read();
      token2 = this._create_token(TOKEN$3.COMMENT, comment);
    }
  }
  return token2;
};
Tokenizer$3.prototype._read_string = function(c) {
  if (c === "`" || c === "'" || c === '"') {
    var resulting_string = this._input.next();
    this.has_char_escapes = false;
    if (c === "`") {
      resulting_string += this._read_string_recursive("`", true, "${");
    } else {
      resulting_string += this._read_string_recursive(c);
    }
    if (this.has_char_escapes && this._options.unescape_strings) {
      resulting_string = unescape_string(resulting_string);
    }
    if (this._input.peek() === c) {
      resulting_string += this._input.next();
    }
    resulting_string = resulting_string.replace(acorn$1.allLineBreaks, "\n");
    return this._create_token(TOKEN$3.STRING, resulting_string);
  }
  return null;
};
Tokenizer$3.prototype._allow_regexp_or_xml = function(previous_token) {
  return previous_token.type === TOKEN$3.RESERVED && in_array$2(previous_token.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || previous_token.type === TOKEN$3.END_EXPR && previous_token.text === ")" && previous_token.opened.previous.type === TOKEN$3.RESERVED && in_array$2(previous_token.opened.previous.text, ["if", "while", "for"]) || in_array$2(previous_token.type, [
    TOKEN$3.COMMENT,
    TOKEN$3.START_EXPR,
    TOKEN$3.START_BLOCK,
    TOKEN$3.START,
    TOKEN$3.END_BLOCK,
    TOKEN$3.OPERATOR,
    TOKEN$3.EQUALS,
    TOKEN$3.EOF,
    TOKEN$3.SEMICOLON,
    TOKEN$3.COMMA
  ]);
};
Tokenizer$3.prototype._read_regexp = function(c, previous_token) {
  if (c === "/" && this._allow_regexp_or_xml(previous_token)) {
    var resulting_string = this._input.next();
    var esc = false;
    var in_char_class = false;
    while (this._input.hasNext() && ((esc || in_char_class || this._input.peek() !== c) && !this._input.testChar(acorn$1.newline))) {
      resulting_string += this._input.peek();
      if (!esc) {
        esc = this._input.peek() === "\\";
        if (this._input.peek() === "[") {
          in_char_class = true;
        } else if (this._input.peek() === "]") {
          in_char_class = false;
        }
      } else {
        esc = false;
      }
      this._input.next();
    }
    if (this._input.peek() === c) {
      resulting_string += this._input.next();
      resulting_string += this._input.read(acorn$1.identifier);
    }
    return this._create_token(TOKEN$3.STRING, resulting_string);
  }
  return null;
};
Tokenizer$3.prototype._read_xml = function(c, previous_token) {
  if (this._options.e4x && c === "<" && this._allow_regexp_or_xml(previous_token)) {
    var xmlStr = "";
    var match = this.__patterns.xml.read_match();
    if (match) {
      var rootTag = match[2].replace(/^{\s+/, "{").replace(/\s+}$/, "}");
      var isCurlyRoot = rootTag.indexOf("{") === 0;
      var depth = 0;
      while (match) {
        var isEndTag = !!match[1];
        var tagName = match[2];
        var isSingletonTag = !!match[match.length - 1] || tagName.slice(0, 8) === "![CDATA[";
        if (!isSingletonTag && (tagName === rootTag || isCurlyRoot && tagName.replace(/^{\s+/, "{").replace(/\s+}$/, "}"))) {
          if (isEndTag) {
            --depth;
          } else {
            ++depth;
          }
        }
        xmlStr += match[0];
        if (depth <= 0) {
          break;
        }
        match = this.__patterns.xml.read_match();
      }
      if (!match) {
        xmlStr += this._input.match(/[\s\S]*/g)[0];
      }
      xmlStr = xmlStr.replace(acorn$1.allLineBreaks, "\n");
      return this._create_token(TOKEN$3.STRING, xmlStr);
    }
  }
  return null;
};
function unescape_string(s) {
  var out = "", escaped = 0;
  var input_scan = new InputScanner$1(s);
  var matched = null;
  while (input_scan.hasNext()) {
    matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);
    if (matched) {
      out += matched[0];
    }
    if (input_scan.peek() === "\\") {
      input_scan.next();
      if (input_scan.peek() === "x") {
        matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
      } else if (input_scan.peek() === "u") {
        matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
      } else {
        out += "\\";
        if (input_scan.hasNext()) {
          out += input_scan.next();
        }
        continue;
      }
      if (!matched) {
        return s;
      }
      escaped = parseInt(matched[1], 16);
      if (escaped > 126 && escaped <= 255 && matched[0].indexOf("x") === 0) {
        return s;
      } else if (escaped >= 0 && escaped < 32) {
        out += "\\" + matched[0];
        continue;
      } else if (escaped === 34 || escaped === 39 || escaped === 92) {
        out += "\\" + String.fromCharCode(escaped);
      } else {
        out += String.fromCharCode(escaped);
      }
    }
  }
  return out;
}
Tokenizer$3.prototype._read_string_recursive = function(delimiter, allow_unescaped_newlines, start_sub) {
  var current_char;
  var pattern2;
  if (delimiter === "'") {
    pattern2 = this.__patterns.single_quote;
  } else if (delimiter === '"') {
    pattern2 = this.__patterns.double_quote;
  } else if (delimiter === "`") {
    pattern2 = this.__patterns.template_text;
  } else if (delimiter === "}") {
    pattern2 = this.__patterns.template_expression;
  }
  var resulting_string = pattern2.read();
  var next = "";
  while (this._input.hasNext()) {
    next = this._input.next();
    if (next === delimiter || !allow_unescaped_newlines && acorn$1.newline.test(next)) {
      this._input.back();
      break;
    } else if (next === "\\" && this._input.hasNext()) {
      current_char = this._input.peek();
      if (current_char === "x" || current_char === "u") {
        this.has_char_escapes = true;
      } else if (current_char === "\r" && this._input.peek(1) === "\n") {
        this._input.next();
      }
      next += this._input.next();
    } else if (start_sub) {
      if (start_sub === "${" && next === "$" && this._input.peek() === "{") {
        next += this._input.next();
      }
      if (start_sub === next) {
        if (delimiter === "`") {
          next += this._read_string_recursive("}", allow_unescaped_newlines, "`");
        } else {
          next += this._read_string_recursive("`", allow_unescaped_newlines, "${");
        }
        if (this._input.hasNext()) {
          next += this._input.next();
        }
      }
    }
    next += pattern2.read();
    resulting_string += next;
  }
  return resulting_string;
};
tokenizer$2.Tokenizer = Tokenizer$3;
tokenizer$2.TOKEN = TOKEN$3;
tokenizer$2.positionable_operators = positionable_operators$1.slice();
tokenizer$2.line_starters = line_starters$1.slice();
var Output$2 = output.Output;
var Token = token.Token;
var acorn = acorn$2;
var Options$7 = options$3.Options;
var Tokenizer$2 = tokenizer$2.Tokenizer;
var line_starters = tokenizer$2.line_starters;
var positionable_operators = tokenizer$2.positionable_operators;
var TOKEN$2 = tokenizer$2.TOKEN;
function in_array$1(what, arr) {
  return arr.indexOf(what) !== -1;
}
function ltrim(s) {
  return s.replace(/^\s+/g, "");
}
function generateMapFromStrings(list) {
  var result = {};
  for (var x = 0; x < list.length; x++) {
    result[list[x].replace(/-/g, "_")] = list[x];
  }
  return result;
}
function reserved_word(token2, word) {
  return token2 && token2.type === TOKEN$2.RESERVED && token2.text === word;
}
function reserved_array(token2, words) {
  return token2 && token2.type === TOKEN$2.RESERVED && in_array$1(token2.text, words);
}
var special_words = ["case", "return", "do", "if", "throw", "else", "await", "break", "continue", "async"];
var validPositionValues = ["before-newline", "after-newline", "preserve-newline"];
var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);
var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];
var MODE = {
  BlockStatement: "BlockStatement",
  Statement: "Statement",
  ObjectLiteral: "ObjectLiteral",
  ArrayLiteral: "ArrayLiteral",
  ForInitializer: "ForInitializer",
  Conditional: "Conditional",
  Expression: "Expression"
};
function remove_redundant_indentation(output2, frame) {
  if (frame.multiline_frame || frame.mode === MODE.ForInitializer || frame.mode === MODE.Conditional) {
    return;
  }
  output2.remove_indent(frame.start_line_index);
}
function split_linebreaks(s) {
  s = s.replace(acorn.allLineBreaks, "\n");
  var out = [], idx = s.indexOf("\n");
  while (idx !== -1) {
    out.push(s.substring(0, idx));
    s = s.substring(idx + 1);
    idx = s.indexOf("\n");
  }
  if (s.length) {
    out.push(s);
  }
  return out;
}
function is_array(mode) {
  return mode === MODE.ArrayLiteral;
}
function is_expression(mode) {
  return in_array$1(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
}
function all_lines_start_with(lines, c) {
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.charAt(0) !== c) {
      return false;
    }
  }
  return true;
}
function each_line_matches_indent(lines, indent) {
  var i = 0, len = lines.length, line;
  for (; i < len; i++) {
    line = lines[i];
    if (line && line.indexOf(indent) !== 0) {
      return false;
    }
  }
  return true;
}
function Beautifier$5(source_text, options2) {
  options2 = options2 || {};
  this._source_text = source_text || "";
  this._output = null;
  this._tokens = null;
  this._last_last_text = null;
  this._flags = null;
  this._previous_flags = null;
  this._flag_store = null;
  this._options = new Options$7(options2);
}
Beautifier$5.prototype.create_flags = function(flags_base, mode) {
  var next_indent_level = 0;
  if (flags_base) {
    next_indent_level = flags_base.indentation_level;
    if (!this._output.just_added_newline() && flags_base.line_indent_level > next_indent_level) {
      next_indent_level = flags_base.line_indent_level;
    }
  }
  var next_flags = {
    mode,
    parent: flags_base,
    last_token: flags_base ? flags_base.last_token : new Token(TOKEN$2.START_BLOCK, ""),
    last_word: flags_base ? flags_base.last_word : "",
    declaration_statement: false,
    declaration_assignment: false,
    multiline_frame: false,
    inline_frame: false,
    if_block: false,
    else_block: false,
    class_start_block: false,
    do_block: false,
    do_while: false,
    import_block: false,
    in_case_statement: false,
    in_case: false,
    case_body: false,
    case_block: false,
    indentation_level: next_indent_level,
    alignment: 0,
    line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
    start_line_index: this._output.get_line_number(),
    ternary_depth: 0
  };
  return next_flags;
};
Beautifier$5.prototype._reset = function(source_text) {
  var baseIndentString = source_text.match(/^[\t ]*/)[0];
  this._last_last_text = "";
  this._output = new Output$2(this._options, baseIndentString);
  this._output.raw = this._options.test_output_raw;
  this._flag_store = [];
  this.set_mode(MODE.BlockStatement);
  var tokenizer2 = new Tokenizer$2(source_text, this._options);
  this._tokens = tokenizer2.tokenize();
  return source_text;
};
Beautifier$5.prototype.beautify = function() {
  if (this._options.disabled) {
    return this._source_text;
  }
  var sweet_code;
  var source_text = this._reset(this._source_text);
  var eol = this._options.eol;
  if (this._options.eol === "auto") {
    eol = "\n";
    if (source_text && acorn.lineBreak.test(source_text || "")) {
      eol = source_text.match(acorn.lineBreak)[0];
    }
  }
  var current_token = this._tokens.next();
  while (current_token) {
    this.handle_token(current_token);
    this._last_last_text = this._flags.last_token.text;
    this._flags.last_token = current_token;
    current_token = this._tokens.next();
  }
  sweet_code = this._output.get_code(eol);
  return sweet_code;
};
Beautifier$5.prototype.handle_token = function(current_token, preserve_statement_flags) {
  if (current_token.type === TOKEN$2.START_EXPR) {
    this.handle_start_expr(current_token);
  } else if (current_token.type === TOKEN$2.END_EXPR) {
    this.handle_end_expr(current_token);
  } else if (current_token.type === TOKEN$2.START_BLOCK) {
    this.handle_start_block(current_token);
  } else if (current_token.type === TOKEN$2.END_BLOCK) {
    this.handle_end_block(current_token);
  } else if (current_token.type === TOKEN$2.WORD) {
    this.handle_word(current_token);
  } else if (current_token.type === TOKEN$2.RESERVED) {
    this.handle_word(current_token);
  } else if (current_token.type === TOKEN$2.SEMICOLON) {
    this.handle_semicolon(current_token);
  } else if (current_token.type === TOKEN$2.STRING) {
    this.handle_string(current_token);
  } else if (current_token.type === TOKEN$2.EQUALS) {
    this.handle_equals(current_token);
  } else if (current_token.type === TOKEN$2.OPERATOR) {
    this.handle_operator(current_token);
  } else if (current_token.type === TOKEN$2.COMMA) {
    this.handle_comma(current_token);
  } else if (current_token.type === TOKEN$2.BLOCK_COMMENT) {
    this.handle_block_comment(current_token, preserve_statement_flags);
  } else if (current_token.type === TOKEN$2.COMMENT) {
    this.handle_comment(current_token, preserve_statement_flags);
  } else if (current_token.type === TOKEN$2.DOT) {
    this.handle_dot(current_token);
  } else if (current_token.type === TOKEN$2.EOF) {
    this.handle_eof(current_token);
  } else if (current_token.type === TOKEN$2.UNKNOWN) {
    this.handle_unknown(current_token, preserve_statement_flags);
  } else {
    this.handle_unknown(current_token, preserve_statement_flags);
  }
};
Beautifier$5.prototype.handle_whitespace_and_comments = function(current_token, preserve_statement_flags) {
  var newlines = current_token.newlines;
  var keep_whitespace = this._options.keep_array_indentation && is_array(this._flags.mode);
  if (current_token.comments_before) {
    var comment_token = current_token.comments_before.next();
    while (comment_token) {
      this.handle_whitespace_and_comments(comment_token, preserve_statement_flags);
      this.handle_token(comment_token, preserve_statement_flags);
      comment_token = current_token.comments_before.next();
    }
  }
  if (keep_whitespace) {
    for (var i = 0; i < newlines; i += 1) {
      this.print_newline(i > 0, preserve_statement_flags);
    }
  } else {
    if (this._options.max_preserve_newlines && newlines > this._options.max_preserve_newlines) {
      newlines = this._options.max_preserve_newlines;
    }
    if (this._options.preserve_newlines) {
      if (newlines > 1) {
        this.print_newline(false, preserve_statement_flags);
        for (var j = 1; j < newlines; j += 1) {
          this.print_newline(true, preserve_statement_flags);
        }
      }
    }
  }
};
var newline_restricted_tokens = ["async", "break", "continue", "return", "throw", "yield"];
Beautifier$5.prototype.allow_wrap_or_preserved_newline = function(current_token, force_linewrap) {
  force_linewrap = force_linewrap === void 0 ? false : force_linewrap;
  if (this._output.just_added_newline()) {
    return;
  }
  var shouldPreserveOrForce = this._options.preserve_newlines && current_token.newlines || force_linewrap;
  var operatorLogicApplies = in_array$1(this._flags.last_token.text, positionable_operators) || in_array$1(current_token.text, positionable_operators);
  if (operatorLogicApplies) {
    var shouldPrintOperatorNewline = in_array$1(this._flags.last_token.text, positionable_operators) && in_array$1(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE) || in_array$1(current_token.text, positionable_operators);
    shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
  }
  if (shouldPreserveOrForce) {
    this.print_newline(false, true);
  } else if (this._options.wrap_line_length) {
    if (reserved_array(this._flags.last_token, newline_restricted_tokens)) {
      return;
    }
    this._output.set_wrap_point();
  }
};
Beautifier$5.prototype.print_newline = function(force_newline, preserve_statement_flags) {
  if (!preserve_statement_flags) {
    if (this._flags.last_token.text !== ";" && this._flags.last_token.text !== "," && this._flags.last_token.text !== "=" && (this._flags.last_token.type !== TOKEN$2.OPERATOR || this._flags.last_token.text === "--" || this._flags.last_token.text === "++")) {
      var next_token = this._tokens.peek();
      while (this._flags.mode === MODE.Statement && !(this._flags.if_block && reserved_word(next_token, "else")) && !this._flags.do_block) {
        this.restore_mode();
      }
    }
  }
  if (this._output.add_new_line(force_newline)) {
    this._flags.multiline_frame = true;
  }
};
Beautifier$5.prototype.print_token_line_indentation = function(current_token) {
  if (this._output.just_added_newline()) {
    if (this._options.keep_array_indentation && current_token.newlines && (current_token.text === "[" || is_array(this._flags.mode))) {
      this._output.current_line.set_indent(-1);
      this._output.current_line.push(current_token.whitespace_before);
      this._output.space_before_token = false;
    } else if (this._output.set_indent(this._flags.indentation_level, this._flags.alignment)) {
      this._flags.line_indent_level = this._flags.indentation_level;
    }
  }
};
Beautifier$5.prototype.print_token = function(current_token) {
  if (this._output.raw) {
    this._output.add_raw_token(current_token);
    return;
  }
  if (this._options.comma_first && current_token.previous && current_token.previous.type === TOKEN$2.COMMA && this._output.just_added_newline()) {
    if (this._output.previous_line.last() === ",") {
      var popped = this._output.previous_line.pop();
      if (this._output.previous_line.is_empty()) {
        this._output.previous_line.push(popped);
        this._output.trim(true);
        this._output.current_line.pop();
        this._output.trim();
      }
      this.print_token_line_indentation(current_token);
      this._output.add_token(",");
      this._output.space_before_token = true;
    }
  }
  this.print_token_line_indentation(current_token);
  this._output.non_breaking_space = true;
  this._output.add_token(current_token.text);
  if (this._output.previous_token_wrapped) {
    this._flags.multiline_frame = true;
  }
};
Beautifier$5.prototype.indent = function() {
  this._flags.indentation_level += 1;
  this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
};
Beautifier$5.prototype.deindent = function() {
  if (this._flags.indentation_level > 0 && (!this._flags.parent || this._flags.indentation_level > this._flags.parent.indentation_level)) {
    this._flags.indentation_level -= 1;
    this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
  }
};
Beautifier$5.prototype.set_mode = function(mode) {
  if (this._flags) {
    this._flag_store.push(this._flags);
    this._previous_flags = this._flags;
  } else {
    this._previous_flags = this.create_flags(null, mode);
  }
  this._flags = this.create_flags(this._previous_flags, mode);
  this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
};
Beautifier$5.prototype.restore_mode = function() {
  if (this._flag_store.length > 0) {
    this._previous_flags = this._flags;
    this._flags = this._flag_store.pop();
    if (this._previous_flags.mode === MODE.Statement) {
      remove_redundant_indentation(this._output, this._previous_flags);
    }
    this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
  }
};
Beautifier$5.prototype.start_of_object_property = function() {
  return this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement && (this._flags.last_token.text === ":" && this._flags.ternary_depth === 0 || reserved_array(this._flags.last_token, ["get", "set"]));
};
Beautifier$5.prototype.start_of_statement = function(current_token) {
  var start = false;
  start = start || reserved_array(this._flags.last_token, ["var", "let", "const"]) && current_token.type === TOKEN$2.WORD;
  start = start || reserved_word(this._flags.last_token, "do");
  start = start || !(this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement) && reserved_array(this._flags.last_token, newline_restricted_tokens) && !current_token.newlines;
  start = start || reserved_word(this._flags.last_token, "else") && !(reserved_word(current_token, "if") && !current_token.comments_before);
  start = start || this._flags.last_token.type === TOKEN$2.END_EXPR && (this._previous_flags.mode === MODE.ForInitializer || this._previous_flags.mode === MODE.Conditional);
  start = start || this._flags.last_token.type === TOKEN$2.WORD && this._flags.mode === MODE.BlockStatement && !this._flags.in_case && !(current_token.text === "--" || current_token.text === "++") && this._last_last_text !== "function" && current_token.type !== TOKEN$2.WORD && current_token.type !== TOKEN$2.RESERVED;
  start = start || this._flags.mode === MODE.ObjectLiteral && (this._flags.last_token.text === ":" && this._flags.ternary_depth === 0 || reserved_array(this._flags.last_token, ["get", "set"]));
  if (start) {
    this.set_mode(MODE.Statement);
    this.indent();
    this.handle_whitespace_and_comments(current_token, true);
    if (!this.start_of_object_property()) {
      this.allow_wrap_or_preserved_newline(current_token, reserved_array(current_token, ["do", "for", "if", "while"]));
    }
    return true;
  }
  return false;
};
Beautifier$5.prototype.handle_start_expr = function(current_token) {
  if (!this.start_of_statement(current_token)) {
    this.handle_whitespace_and_comments(current_token);
  }
  var next_mode = MODE.Expression;
  if (current_token.text === "[") {
    if (this._flags.last_token.type === TOKEN$2.WORD || this._flags.last_token.text === ")") {
      if (reserved_array(this._flags.last_token, line_starters)) {
        this._output.space_before_token = true;
      }
      this.print_token(current_token);
      this.set_mode(next_mode);
      this.indent();
      if (this._options.space_in_paren) {
        this._output.space_before_token = true;
      }
      return;
    }
    next_mode = MODE.ArrayLiteral;
    if (is_array(this._flags.mode)) {
      if (this._flags.last_token.text === "[" || this._flags.last_token.text === "," && (this._last_last_text === "]" || this._last_last_text === "}")) {
        if (!this._options.keep_array_indentation) {
          this.print_newline();
        }
      }
    }
    if (!in_array$1(this._flags.last_token.type, [TOKEN$2.START_EXPR, TOKEN$2.END_EXPR, TOKEN$2.WORD, TOKEN$2.OPERATOR, TOKEN$2.DOT])) {
      this._output.space_before_token = true;
    }
  } else {
    if (this._flags.last_token.type === TOKEN$2.RESERVED) {
      if (this._flags.last_token.text === "for") {
        this._output.space_before_token = this._options.space_before_conditional;
        next_mode = MODE.ForInitializer;
      } else if (in_array$1(this._flags.last_token.text, ["if", "while", "switch"])) {
        this._output.space_before_token = this._options.space_before_conditional;
        next_mode = MODE.Conditional;
      } else if (in_array$1(this._flags.last_word, ["await", "async"])) {
        this._output.space_before_token = true;
      } else if (this._flags.last_token.text === "import" && current_token.whitespace_before === "") {
        this._output.space_before_token = false;
      } else if (in_array$1(this._flags.last_token.text, line_starters) || this._flags.last_token.text === "catch") {
        this._output.space_before_token = true;
      }
    } else if (this._flags.last_token.type === TOKEN$2.EQUALS || this._flags.last_token.type === TOKEN$2.OPERATOR) {
      if (!this.start_of_object_property()) {
        this.allow_wrap_or_preserved_newline(current_token);
      }
    } else if (this._flags.last_token.type === TOKEN$2.WORD) {
      this._output.space_before_token = false;
      var peek_back_two = this._tokens.peek(-3);
      if (this._options.space_after_named_function && peek_back_two) {
        var peek_back_three = this._tokens.peek(-4);
        if (reserved_array(peek_back_two, ["async", "function"]) || peek_back_two.text === "*" && reserved_array(peek_back_three, ["async", "function"])) {
          this._output.space_before_token = true;
        } else if (this._flags.mode === MODE.ObjectLiteral) {
          if (peek_back_two.text === "{" || peek_back_two.text === "," || peek_back_two.text === "*" && (peek_back_three.text === "{" || peek_back_three.text === ",")) {
            this._output.space_before_token = true;
          }
        } else if (this._flags.parent && this._flags.parent.class_start_block) {
          this._output.space_before_token = true;
        }
      }
    } else {
      this.allow_wrap_or_preserved_newline(current_token);
    }
    if (this._flags.last_token.type === TOKEN$2.RESERVED && (this._flags.last_word === "function" || this._flags.last_word === "typeof") || this._flags.last_token.text === "*" && (in_array$1(this._last_last_text, ["function", "yield"]) || this._flags.mode === MODE.ObjectLiteral && in_array$1(this._last_last_text, ["{", ","]))) {
      this._output.space_before_token = this._options.space_after_anon_function;
    }
  }
  if (this._flags.last_token.text === ";" || this._flags.last_token.type === TOKEN$2.START_BLOCK) {
    this.print_newline();
  } else if (this._flags.last_token.type === TOKEN$2.END_EXPR || this._flags.last_token.type === TOKEN$2.START_EXPR || this._flags.last_token.type === TOKEN$2.END_BLOCK || this._flags.last_token.text === "." || this._flags.last_token.type === TOKEN$2.COMMA) {
    this.allow_wrap_or_preserved_newline(current_token, current_token.newlines);
  }
  this.print_token(current_token);
  this.set_mode(next_mode);
  if (this._options.space_in_paren) {
    this._output.space_before_token = true;
  }
  this.indent();
};
Beautifier$5.prototype.handle_end_expr = function(current_token) {
  while (this._flags.mode === MODE.Statement) {
    this.restore_mode();
  }
  this.handle_whitespace_and_comments(current_token);
  if (this._flags.multiline_frame) {
    this.allow_wrap_or_preserved_newline(current_token, current_token.text === "]" && is_array(this._flags.mode) && !this._options.keep_array_indentation);
  }
  if (this._options.space_in_paren) {
    if (this._flags.last_token.type === TOKEN$2.START_EXPR && !this._options.space_in_empty_paren) {
      this._output.trim();
      this._output.space_before_token = false;
    } else {
      this._output.space_before_token = true;
    }
  }
  this.deindent();
  this.print_token(current_token);
  this.restore_mode();
  remove_redundant_indentation(this._output, this._previous_flags);
  if (this._flags.do_while && this._previous_flags.mode === MODE.Conditional) {
    this._previous_flags.mode = MODE.Expression;
    this._flags.do_block = false;
    this._flags.do_while = false;
  }
};
Beautifier$5.prototype.handle_start_block = function(current_token) {
  this.handle_whitespace_and_comments(current_token);
  var next_token = this._tokens.peek();
  var second_token = this._tokens.peek(1);
  if (this._flags.last_word === "switch" && this._flags.last_token.type === TOKEN$2.END_EXPR) {
    this.set_mode(MODE.BlockStatement);
    this._flags.in_case_statement = true;
  } else if (this._flags.case_body) {
    this.set_mode(MODE.BlockStatement);
  } else if (second_token && (in_array$1(second_token.text, [":", ","]) && in_array$1(next_token.type, [TOKEN$2.STRING, TOKEN$2.WORD, TOKEN$2.RESERVED]) || in_array$1(next_token.text, ["get", "set", "..."]) && in_array$1(second_token.type, [TOKEN$2.WORD, TOKEN$2.RESERVED]))) {
    if (in_array$1(this._last_last_text, ["class", "interface"]) && !in_array$1(second_token.text, [":", ","])) {
      this.set_mode(MODE.BlockStatement);
    } else {
      this.set_mode(MODE.ObjectLiteral);
    }
  } else if (this._flags.last_token.type === TOKEN$2.OPERATOR && this._flags.last_token.text === "=>") {
    this.set_mode(MODE.BlockStatement);
  } else if (in_array$1(this._flags.last_token.type, [TOKEN$2.EQUALS, TOKEN$2.START_EXPR, TOKEN$2.COMMA, TOKEN$2.OPERATOR]) || reserved_array(this._flags.last_token, ["return", "throw", "import", "default"])) {
    this.set_mode(MODE.ObjectLiteral);
  } else {
    this.set_mode(MODE.BlockStatement);
  }
  if (this._flags.last_token) {
    if (reserved_array(this._flags.last_token.previous, ["class", "extends"])) {
      this._flags.class_start_block = true;
    }
  }
  var empty_braces = !next_token.comments_before && next_token.text === "}";
  var empty_anonymous_function = empty_braces && this._flags.last_word === "function" && this._flags.last_token.type === TOKEN$2.END_EXPR;
  if (this._options.brace_preserve_inline) {
    var index2 = 0;
    var check_token = null;
    this._flags.inline_frame = true;
    do {
      index2 += 1;
      check_token = this._tokens.peek(index2 - 1);
      if (check_token.newlines) {
        this._flags.inline_frame = false;
        break;
      }
    } while (check_token.type !== TOKEN$2.EOF && !(check_token.type === TOKEN$2.END_BLOCK && check_token.opened === current_token));
  }
  if ((this._options.brace_style === "expand" || this._options.brace_style === "none" && current_token.newlines) && !this._flags.inline_frame) {
    if (this._flags.last_token.type !== TOKEN$2.OPERATOR && (empty_anonymous_function || this._flags.last_token.type === TOKEN$2.EQUALS || reserved_array(this._flags.last_token, special_words) && this._flags.last_token.text !== "else")) {
      this._output.space_before_token = true;
    } else {
      this.print_newline(false, true);
    }
  } else {
    if (is_array(this._previous_flags.mode) && (this._flags.last_token.type === TOKEN$2.START_EXPR || this._flags.last_token.type === TOKEN$2.COMMA)) {
      if (this._flags.last_token.type === TOKEN$2.COMMA || this._options.space_in_paren) {
        this._output.space_before_token = true;
      }
      if (this._flags.last_token.type === TOKEN$2.COMMA || this._flags.last_token.type === TOKEN$2.START_EXPR && this._flags.inline_frame) {
        this.allow_wrap_or_preserved_newline(current_token);
        this._previous_flags.multiline_frame = this._previous_flags.multiline_frame || this._flags.multiline_frame;
        this._flags.multiline_frame = false;
      }
    }
    if (this._flags.last_token.type !== TOKEN$2.OPERATOR && this._flags.last_token.type !== TOKEN$2.START_EXPR) {
      if (this._flags.last_token.type === TOKEN$2.START_BLOCK && !this._flags.inline_frame) {
        this.print_newline();
      } else {
        this._output.space_before_token = true;
      }
    }
  }
  this.print_token(current_token);
  this.indent();
  if (!empty_braces && !(this._options.brace_preserve_inline && this._flags.inline_frame)) {
    this.print_newline();
  }
};
Beautifier$5.prototype.handle_end_block = function(current_token) {
  this.handle_whitespace_and_comments(current_token);
  while (this._flags.mode === MODE.Statement) {
    this.restore_mode();
  }
  var empty_braces = this._flags.last_token.type === TOKEN$2.START_BLOCK;
  if (this._flags.inline_frame && !empty_braces) {
    this._output.space_before_token = true;
  } else if (this._options.brace_style === "expand") {
    if (!empty_braces) {
      this.print_newline();
    }
  } else {
    if (!empty_braces) {
      if (is_array(this._flags.mode) && this._options.keep_array_indentation) {
        this._options.keep_array_indentation = false;
        this.print_newline();
        this._options.keep_array_indentation = true;
      } else {
        this.print_newline();
      }
    }
  }
  this.restore_mode();
  this.print_token(current_token);
};
Beautifier$5.prototype.handle_word = function(current_token) {
  if (current_token.type === TOKEN$2.RESERVED) {
    if (in_array$1(current_token.text, ["set", "get"]) && this._flags.mode !== MODE.ObjectLiteral) {
      current_token.type = TOKEN$2.WORD;
    } else if (current_token.text === "import" && in_array$1(this._tokens.peek().text, ["(", "."])) {
      current_token.type = TOKEN$2.WORD;
    } else if (in_array$1(current_token.text, ["as", "from"]) && !this._flags.import_block) {
      current_token.type = TOKEN$2.WORD;
    } else if (this._flags.mode === MODE.ObjectLiteral) {
      var next_token = this._tokens.peek();
      if (next_token.text === ":") {
        current_token.type = TOKEN$2.WORD;
      }
    }
  }
  if (this.start_of_statement(current_token)) {
    if (reserved_array(this._flags.last_token, ["var", "let", "const"]) && current_token.type === TOKEN$2.WORD) {
      this._flags.declaration_statement = true;
    }
  } else if (current_token.newlines && !is_expression(this._flags.mode) && (this._flags.last_token.type !== TOKEN$2.OPERATOR || (this._flags.last_token.text === "--" || this._flags.last_token.text === "++")) && this._flags.last_token.type !== TOKEN$2.EQUALS && (this._options.preserve_newlines || !reserved_array(this._flags.last_token, ["var", "let", "const", "set", "get"]))) {
    this.handle_whitespace_and_comments(current_token);
    this.print_newline();
  } else {
    this.handle_whitespace_and_comments(current_token);
  }
  if (this._flags.do_block && !this._flags.do_while) {
    if (reserved_word(current_token, "while")) {
      this._output.space_before_token = true;
      this.print_token(current_token);
      this._output.space_before_token = true;
      this._flags.do_while = true;
      return;
    } else {
      this.print_newline();
      this._flags.do_block = false;
    }
  }
  if (this._flags.if_block) {
    if (!this._flags.else_block && reserved_word(current_token, "else")) {
      this._flags.else_block = true;
    } else {
      while (this._flags.mode === MODE.Statement) {
        this.restore_mode();
      }
      this._flags.if_block = false;
      this._flags.else_block = false;
    }
  }
  if (this._flags.in_case_statement && reserved_array(current_token, ["case", "default"])) {
    this.print_newline();
    if (!this._flags.case_block && (this._flags.case_body || this._options.jslint_happy)) {
      this.deindent();
    }
    this._flags.case_body = false;
    this.print_token(current_token);
    this._flags.in_case = true;
    return;
  }
  if (this._flags.last_token.type === TOKEN$2.COMMA || this._flags.last_token.type === TOKEN$2.START_EXPR || this._flags.last_token.type === TOKEN$2.EQUALS || this._flags.last_token.type === TOKEN$2.OPERATOR) {
    if (!this.start_of_object_property()) {
      this.allow_wrap_or_preserved_newline(current_token);
    }
  }
  if (reserved_word(current_token, "function")) {
    if (in_array$1(this._flags.last_token.text, ["}", ";"]) || this._output.just_added_newline() && !(in_array$1(this._flags.last_token.text, ["(", "[", "{", ":", "=", ","]) || this._flags.last_token.type === TOKEN$2.OPERATOR)) {
      if (!this._output.just_added_blankline() && !current_token.comments_before) {
        this.print_newline();
        this.print_newline(true);
      }
    }
    if (this._flags.last_token.type === TOKEN$2.RESERVED || this._flags.last_token.type === TOKEN$2.WORD) {
      if (reserved_array(this._flags.last_token, ["get", "set", "new", "export"]) || reserved_array(this._flags.last_token, newline_restricted_tokens)) {
        this._output.space_before_token = true;
      } else if (reserved_word(this._flags.last_token, "default") && this._last_last_text === "export") {
        this._output.space_before_token = true;
      } else if (this._flags.last_token.text === "declare") {
        this._output.space_before_token = true;
      } else {
        this.print_newline();
      }
    } else if (this._flags.last_token.type === TOKEN$2.OPERATOR || this._flags.last_token.text === "=") {
      this._output.space_before_token = true;
    } else if (!this._flags.multiline_frame && (is_expression(this._flags.mode) || is_array(this._flags.mode)))
      ;
    else {
      this.print_newline();
    }
    this.print_token(current_token);
    this._flags.last_word = current_token.text;
    return;
  }
  var prefix = "NONE";
  if (this._flags.last_token.type === TOKEN$2.END_BLOCK) {
    if (this._previous_flags.inline_frame) {
      prefix = "SPACE";
    } else if (!reserved_array(current_token, ["else", "catch", "finally", "from"])) {
      prefix = "NEWLINE";
    } else {
      if (this._options.brace_style === "expand" || this._options.brace_style === "end-expand" || this._options.brace_style === "none" && current_token.newlines) {
        prefix = "NEWLINE";
      } else {
        prefix = "SPACE";
        this._output.space_before_token = true;
      }
    }
  } else if (this._flags.last_token.type === TOKEN$2.SEMICOLON && this._flags.mode === MODE.BlockStatement) {
    prefix = "NEWLINE";
  } else if (this._flags.last_token.type === TOKEN$2.SEMICOLON && is_expression(this._flags.mode)) {
    prefix = "SPACE";
  } else if (this._flags.last_token.type === TOKEN$2.STRING) {
    prefix = "NEWLINE";
  } else if (this._flags.last_token.type === TOKEN$2.RESERVED || this._flags.last_token.type === TOKEN$2.WORD || this._flags.last_token.text === "*" && (in_array$1(this._last_last_text, ["function", "yield"]) || this._flags.mode === MODE.ObjectLiteral && in_array$1(this._last_last_text, ["{", ","]))) {
    prefix = "SPACE";
  } else if (this._flags.last_token.type === TOKEN$2.START_BLOCK) {
    if (this._flags.inline_frame) {
      prefix = "SPACE";
    } else {
      prefix = "NEWLINE";
    }
  } else if (this._flags.last_token.type === TOKEN$2.END_EXPR) {
    this._output.space_before_token = true;
    prefix = "NEWLINE";
  }
  if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ")") {
    if (this._flags.inline_frame || this._flags.last_token.text === "else" || this._flags.last_token.text === "export") {
      prefix = "SPACE";
    } else {
      prefix = "NEWLINE";
    }
  }
  if (reserved_array(current_token, ["else", "catch", "finally"])) {
    if ((!(this._flags.last_token.type === TOKEN$2.END_BLOCK && this._previous_flags.mode === MODE.BlockStatement) || this._options.brace_style === "expand" || this._options.brace_style === "end-expand" || this._options.brace_style === "none" && current_token.newlines) && !this._flags.inline_frame) {
      this.print_newline();
    } else {
      this._output.trim(true);
      var line = this._output.current_line;
      if (line.last() !== "}") {
        this.print_newline();
      }
      this._output.space_before_token = true;
    }
  } else if (prefix === "NEWLINE") {
    if (reserved_array(this._flags.last_token, special_words)) {
      this._output.space_before_token = true;
    } else if (this._flags.last_token.text === "declare" && reserved_array(current_token, ["var", "let", "const"])) {
      this._output.space_before_token = true;
    } else if (this._flags.last_token.type !== TOKEN$2.END_EXPR) {
      if ((this._flags.last_token.type !== TOKEN$2.START_EXPR || !reserved_array(current_token, ["var", "let", "const"])) && this._flags.last_token.text !== ":") {
        if (reserved_word(current_token, "if") && reserved_word(current_token.previous, "else")) {
          this._output.space_before_token = true;
        } else {
          this.print_newline();
        }
      }
    } else if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ")") {
      this.print_newline();
    }
  } else if (this._flags.multiline_frame && is_array(this._flags.mode) && this._flags.last_token.text === "," && this._last_last_text === "}") {
    this.print_newline();
  } else if (prefix === "SPACE") {
    this._output.space_before_token = true;
  }
  if (current_token.previous && (current_token.previous.type === TOKEN$2.WORD || current_token.previous.type === TOKEN$2.RESERVED)) {
    this._output.space_before_token = true;
  }
  this.print_token(current_token);
  this._flags.last_word = current_token.text;
  if (current_token.type === TOKEN$2.RESERVED) {
    if (current_token.text === "do") {
      this._flags.do_block = true;
    } else if (current_token.text === "if") {
      this._flags.if_block = true;
    } else if (current_token.text === "import") {
      this._flags.import_block = true;
    } else if (this._flags.import_block && reserved_word(current_token, "from")) {
      this._flags.import_block = false;
    }
  }
};
Beautifier$5.prototype.handle_semicolon = function(current_token) {
  if (this.start_of_statement(current_token)) {
    this._output.space_before_token = false;
  } else {
    this.handle_whitespace_and_comments(current_token);
  }
  var next_token = this._tokens.peek();
  while (this._flags.mode === MODE.Statement && !(this._flags.if_block && reserved_word(next_token, "else")) && !this._flags.do_block) {
    this.restore_mode();
  }
  if (this._flags.import_block) {
    this._flags.import_block = false;
  }
  this.print_token(current_token);
};
Beautifier$5.prototype.handle_string = function(current_token) {
  if (current_token.text.startsWith("`") && current_token.newlines === 0 && current_token.whitespace_before === "" && (current_token.previous.text === ")" || this._flags.last_token.type === TOKEN$2.WORD))
    ;
  else if (this.start_of_statement(current_token)) {
    this._output.space_before_token = true;
  } else {
    this.handle_whitespace_and_comments(current_token);
    if (this._flags.last_token.type === TOKEN$2.RESERVED || this._flags.last_token.type === TOKEN$2.WORD || this._flags.inline_frame) {
      this._output.space_before_token = true;
    } else if (this._flags.last_token.type === TOKEN$2.COMMA || this._flags.last_token.type === TOKEN$2.START_EXPR || this._flags.last_token.type === TOKEN$2.EQUALS || this._flags.last_token.type === TOKEN$2.OPERATOR) {
      if (!this.start_of_object_property()) {
        this.allow_wrap_or_preserved_newline(current_token);
      }
    } else if (current_token.text.startsWith("`") && this._flags.last_token.type === TOKEN$2.END_EXPR && (current_token.previous.text === "]" || current_token.previous.text === ")") && current_token.newlines === 0) {
      this._output.space_before_token = true;
    } else {
      this.print_newline();
    }
  }
  this.print_token(current_token);
};
Beautifier$5.prototype.handle_equals = function(current_token) {
  if (this.start_of_statement(current_token))
    ;
  else {
    this.handle_whitespace_and_comments(current_token);
  }
  if (this._flags.declaration_statement) {
    this._flags.declaration_assignment = true;
  }
  this._output.space_before_token = true;
  this.print_token(current_token);
  this._output.space_before_token = true;
};
Beautifier$5.prototype.handle_comma = function(current_token) {
  this.handle_whitespace_and_comments(current_token, true);
  this.print_token(current_token);
  this._output.space_before_token = true;
  if (this._flags.declaration_statement) {
    if (is_expression(this._flags.parent.mode)) {
      this._flags.declaration_assignment = false;
    }
    if (this._flags.declaration_assignment) {
      this._flags.declaration_assignment = false;
      this.print_newline(false, true);
    } else if (this._options.comma_first) {
      this.allow_wrap_or_preserved_newline(current_token);
    }
  } else if (this._flags.mode === MODE.ObjectLiteral || this._flags.mode === MODE.Statement && this._flags.parent.mode === MODE.ObjectLiteral) {
    if (this._flags.mode === MODE.Statement) {
      this.restore_mode();
    }
    if (!this._flags.inline_frame) {
      this.print_newline();
    }
  } else if (this._options.comma_first) {
    this.allow_wrap_or_preserved_newline(current_token);
  }
};
Beautifier$5.prototype.handle_operator = function(current_token) {
  var isGeneratorAsterisk = current_token.text === "*" && (reserved_array(this._flags.last_token, ["function", "yield"]) || in_array$1(this._flags.last_token.type, [TOKEN$2.START_BLOCK, TOKEN$2.COMMA, TOKEN$2.END_BLOCK, TOKEN$2.SEMICOLON]));
  var isUnary = in_array$1(current_token.text, ["-", "+"]) && (in_array$1(this._flags.last_token.type, [TOKEN$2.START_BLOCK, TOKEN$2.START_EXPR, TOKEN$2.EQUALS, TOKEN$2.OPERATOR]) || in_array$1(this._flags.last_token.text, line_starters) || this._flags.last_token.text === ",");
  if (this.start_of_statement(current_token))
    ;
  else {
    var preserve_statement_flags = !isGeneratorAsterisk;
    this.handle_whitespace_and_comments(current_token, preserve_statement_flags);
  }
  if (current_token.text === "*" && this._flags.last_token.type === TOKEN$2.DOT) {
    this.print_token(current_token);
    return;
  }
  if (current_token.text === "::") {
    this.print_token(current_token);
    return;
  }
  if (this._flags.last_token.type === TOKEN$2.OPERATOR && in_array$1(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
    this.allow_wrap_or_preserved_newline(current_token);
  }
  if (current_token.text === ":" && this._flags.in_case) {
    this.print_token(current_token);
    this._flags.in_case = false;
    this._flags.case_body = true;
    if (this._tokens.peek().type !== TOKEN$2.START_BLOCK) {
      this.indent();
      this.print_newline();
      this._flags.case_block = false;
    } else {
      this._flags.case_block = true;
      this._output.space_before_token = true;
    }
    return;
  }
  var space_before = true;
  var space_after = true;
  var in_ternary = false;
  if (current_token.text === ":") {
    if (this._flags.ternary_depth === 0) {
      space_before = false;
    } else {
      this._flags.ternary_depth -= 1;
      in_ternary = true;
    }
  } else if (current_token.text === "?") {
    this._flags.ternary_depth += 1;
  }
  if (!isUnary && !isGeneratorAsterisk && this._options.preserve_newlines && in_array$1(current_token.text, positionable_operators)) {
    var isColon = current_token.text === ":";
    var isTernaryColon = isColon && in_ternary;
    var isOtherColon = isColon && !in_ternary;
    switch (this._options.operator_position) {
      case OPERATOR_POSITION.before_newline:
        this._output.space_before_token = !isOtherColon;
        this.print_token(current_token);
        if (!isColon || isTernaryColon) {
          this.allow_wrap_or_preserved_newline(current_token);
        }
        this._output.space_before_token = true;
        return;
      case OPERATOR_POSITION.after_newline:
        this._output.space_before_token = true;
        if (!isColon || isTernaryColon) {
          if (this._tokens.peek().newlines) {
            this.print_newline(false, true);
          } else {
            this.allow_wrap_or_preserved_newline(current_token);
          }
        } else {
          this._output.space_before_token = false;
        }
        this.print_token(current_token);
        this._output.space_before_token = true;
        return;
      case OPERATOR_POSITION.preserve_newline:
        if (!isOtherColon) {
          this.allow_wrap_or_preserved_newline(current_token);
        }
        space_before = !(this._output.just_added_newline() || isOtherColon);
        this._output.space_before_token = space_before;
        this.print_token(current_token);
        this._output.space_before_token = true;
        return;
    }
  }
  if (isGeneratorAsterisk) {
    this.allow_wrap_or_preserved_newline(current_token);
    space_before = false;
    var next_token = this._tokens.peek();
    space_after = next_token && in_array$1(next_token.type, [TOKEN$2.WORD, TOKEN$2.RESERVED]);
  } else if (current_token.text === "...") {
    this.allow_wrap_or_preserved_newline(current_token);
    space_before = this._flags.last_token.type === TOKEN$2.START_BLOCK;
    space_after = false;
  } else if (in_array$1(current_token.text, ["--", "++", "!", "~"]) || isUnary) {
    if (this._flags.last_token.type === TOKEN$2.COMMA || this._flags.last_token.type === TOKEN$2.START_EXPR) {
      this.allow_wrap_or_preserved_newline(current_token);
    }
    space_before = false;
    space_after = false;
    if (current_token.newlines && (current_token.text === "--" || current_token.text === "++" || current_token.text === "~")) {
      var new_line_needed = reserved_array(this._flags.last_token, special_words) && current_token.newlines;
      if (new_line_needed && (this._previous_flags.if_block || this._previous_flags.else_block)) {
        this.restore_mode();
      }
      this.print_newline(new_line_needed, true);
    }
    if (this._flags.last_token.text === ";" && is_expression(this._flags.mode)) {
      space_before = true;
    }
    if (this._flags.last_token.type === TOKEN$2.RESERVED) {
      space_before = true;
    } else if (this._flags.last_token.type === TOKEN$2.END_EXPR) {
      space_before = !(this._flags.last_token.text === "]" && (current_token.text === "--" || current_token.text === "++"));
    } else if (this._flags.last_token.type === TOKEN$2.OPERATOR) {
      space_before = in_array$1(current_token.text, ["--", "-", "++", "+"]) && in_array$1(this._flags.last_token.text, ["--", "-", "++", "+"]);
      if (in_array$1(current_token.text, ["+", "-"]) && in_array$1(this._flags.last_token.text, ["--", "++"])) {
        space_after = true;
      }
    }
    if ((this._flags.mode === MODE.BlockStatement && !this._flags.inline_frame || this._flags.mode === MODE.Statement) && (this._flags.last_token.text === "{" || this._flags.last_token.text === ";")) {
      this.print_newline();
    }
  }
  this._output.space_before_token = this._output.space_before_token || space_before;
  this.print_token(current_token);
  this._output.space_before_token = space_after;
};
Beautifier$5.prototype.handle_block_comment = function(current_token, preserve_statement_flags) {
  if (this._output.raw) {
    this._output.add_raw_token(current_token);
    if (current_token.directives && current_token.directives.preserve === "end") {
      this._output.raw = this._options.test_output_raw;
    }
    return;
  }
  if (current_token.directives) {
    this.print_newline(false, preserve_statement_flags);
    this.print_token(current_token);
    if (current_token.directives.preserve === "start") {
      this._output.raw = true;
    }
    this.print_newline(false, true);
    return;
  }
  if (!acorn.newline.test(current_token.text) && !current_token.newlines) {
    this._output.space_before_token = true;
    this.print_token(current_token);
    this._output.space_before_token = true;
    return;
  } else {
    this.print_block_commment(current_token, preserve_statement_flags);
  }
};
Beautifier$5.prototype.print_block_commment = function(current_token, preserve_statement_flags) {
  var lines = split_linebreaks(current_token.text);
  var j;
  var javadoc = false;
  var starless = false;
  var lastIndent = current_token.whitespace_before;
  var lastIndentLength = lastIndent.length;
  this.print_newline(false, preserve_statement_flags);
  this.print_token_line_indentation(current_token);
  this._output.add_token(lines[0]);
  this.print_newline(false, preserve_statement_flags);
  if (lines.length > 1) {
    lines = lines.slice(1);
    javadoc = all_lines_start_with(lines, "*");
    starless = each_line_matches_indent(lines, lastIndent);
    if (javadoc) {
      this._flags.alignment = 1;
    }
    for (j = 0; j < lines.length; j++) {
      if (javadoc) {
        this.print_token_line_indentation(current_token);
        this._output.add_token(ltrim(lines[j]));
      } else if (starless && lines[j]) {
        this.print_token_line_indentation(current_token);
        this._output.add_token(lines[j].substring(lastIndentLength));
      } else {
        this._output.current_line.set_indent(-1);
        this._output.add_token(lines[j]);
      }
      this.print_newline(false, preserve_statement_flags);
    }
    this._flags.alignment = 0;
  }
};
Beautifier$5.prototype.handle_comment = function(current_token, preserve_statement_flags) {
  if (current_token.newlines) {
    this.print_newline(false, preserve_statement_flags);
  } else {
    this._output.trim(true);
  }
  this._output.space_before_token = true;
  this.print_token(current_token);
  this.print_newline(false, preserve_statement_flags);
};
Beautifier$5.prototype.handle_dot = function(current_token) {
  if (this.start_of_statement(current_token))
    ;
  else {
    this.handle_whitespace_and_comments(current_token, true);
  }
  if (this._flags.last_token.text.match("^[0-9]+$")) {
    this._output.space_before_token = true;
  }
  if (reserved_array(this._flags.last_token, special_words)) {
    this._output.space_before_token = false;
  } else {
    this.allow_wrap_or_preserved_newline(current_token, this._flags.last_token.text === ")" && this._options.break_chained_methods);
  }
  if (this._options.unindent_chained_methods && this._output.just_added_newline()) {
    this.deindent();
  }
  this.print_token(current_token);
};
Beautifier$5.prototype.handle_unknown = function(current_token, preserve_statement_flags) {
  this.print_token(current_token);
  if (current_token.text[current_token.text.length - 1] === "\n") {
    this.print_newline(false, preserve_statement_flags);
  }
};
Beautifier$5.prototype.handle_eof = function(current_token) {
  while (this._flags.mode === MODE.Statement) {
    this.restore_mode();
  }
  this.handle_whitespace_and_comments(current_token);
};
beautifier$2.Beautifier = Beautifier$5;
var Beautifier$4 = beautifier$2.Beautifier, Options$6 = options$3.Options;
function js_beautify$1(js_source_text, options2) {
  var beautifier2 = new Beautifier$4(js_source_text, options2);
  return beautifier2.beautify();
}
javascript.exports = js_beautify$1;
javascript.exports.defaultOptions = function() {
  return new Options$6();
};
var css = { exports: {} };
var beautifier$1 = {};
var options$1 = {};
var BaseOptions$1 = options$2.Options;
function Options$5(options2) {
  BaseOptions$1.call(this, options2, "css");
  this.selector_separator_newline = this._get_boolean("selector_separator_newline", true);
  this.newline_between_rules = this._get_boolean("newline_between_rules", true);
  var space_around_selector_separator = this._get_boolean("space_around_selector_separator");
  this.space_around_combinator = this._get_boolean("space_around_combinator") || space_around_selector_separator;
  var brace_style_split = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
  this.brace_style = "collapse";
  for (var bs = 0; bs < brace_style_split.length; bs++) {
    if (brace_style_split[bs] !== "expand") {
      this.brace_style = "collapse";
    } else {
      this.brace_style = brace_style_split[bs];
    }
  }
}
Options$5.prototype = new BaseOptions$1();
options$1.Options = Options$5;
var Options$4 = options$1.Options;
var Output$1 = output.Output;
var InputScanner = inputscanner.InputScanner;
var Directives$1 = directives.Directives;
var directives_core$1 = new Directives$1(/\/\*/, /\*\//);
var lineBreak$1 = /\r\n|[\r\n]/;
var allLineBreaks$1 = /\r\n|[\r\n]/g;
var whitespaceChar = /\s/;
var whitespacePattern = /(?:\s|\n)+/g;
var block_comment_pattern = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g;
var comment_pattern = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
function Beautifier$3(source_text, options2) {
  this._source_text = source_text || "";
  this._options = new Options$4(options2);
  this._ch = null;
  this._input = null;
  this.NESTED_AT_RULE = {
    "@page": true,
    "@font-face": true,
    "@keyframes": true,
    "@media": true,
    "@supports": true,
    "@document": true
  };
  this.CONDITIONAL_GROUP_RULE = {
    "@media": true,
    "@supports": true,
    "@document": true
  };
  this.NON_SEMICOLON_NEWLINE_PROPERTY = [
    "grid-template-areas",
    "grid-template"
  ];
}
Beautifier$3.prototype.eatString = function(endChars) {
  var result = "";
  this._ch = this._input.next();
  while (this._ch) {
    result += this._ch;
    if (this._ch === "\\") {
      result += this._input.next();
    } else if (endChars.indexOf(this._ch) !== -1 || this._ch === "\n") {
      break;
    }
    this._ch = this._input.next();
  }
  return result;
};
Beautifier$3.prototype.eatWhitespace = function(allowAtLeastOneNewLine) {
  var result = whitespaceChar.test(this._input.peek());
  var newline_count = 0;
  while (whitespaceChar.test(this._input.peek())) {
    this._ch = this._input.next();
    if (allowAtLeastOneNewLine && this._ch === "\n") {
      if (newline_count === 0 || newline_count < this._options.max_preserve_newlines) {
        newline_count++;
        this._output.add_new_line(true);
      }
    }
  }
  return result;
};
Beautifier$3.prototype.foundNestedPseudoClass = function() {
  var openParen = 0;
  var i = 1;
  var ch = this._input.peek(i);
  while (ch) {
    if (ch === "{") {
      return true;
    } else if (ch === "(") {
      openParen += 1;
    } else if (ch === ")") {
      if (openParen === 0) {
        return false;
      }
      openParen -= 1;
    } else if (ch === ";" || ch === "}") {
      return false;
    }
    i++;
    ch = this._input.peek(i);
  }
  return false;
};
Beautifier$3.prototype.print_string = function(output_string) {
  this._output.set_indent(this._indentLevel);
  this._output.non_breaking_space = true;
  this._output.add_token(output_string);
};
Beautifier$3.prototype.preserveSingleSpace = function(isAfterSpace) {
  if (isAfterSpace) {
    this._output.space_before_token = true;
  }
};
Beautifier$3.prototype.indent = function() {
  this._indentLevel++;
};
Beautifier$3.prototype.outdent = function() {
  if (this._indentLevel > 0) {
    this._indentLevel--;
  }
};
Beautifier$3.prototype.beautify = function() {
  if (this._options.disabled) {
    return this._source_text;
  }
  var source_text = this._source_text;
  var eol = this._options.eol;
  if (eol === "auto") {
    eol = "\n";
    if (source_text && lineBreak$1.test(source_text || "")) {
      eol = source_text.match(lineBreak$1)[0];
    }
  }
  source_text = source_text.replace(allLineBreaks$1, "\n");
  var baseIndentString = source_text.match(/^[\t ]*/)[0];
  this._output = new Output$1(this._options, baseIndentString);
  this._input = new InputScanner(source_text);
  this._indentLevel = 0;
  this._nestedLevel = 0;
  this._ch = null;
  var parenLevel = 0;
  var insideRule = false;
  var insidePropertyValue = false;
  var enteringConditionalGroup = false;
  var insideAtExtend = false;
  var insideAtImport = false;
  var insideScssMap = false;
  var topCharacter = this._ch;
  var insideNonSemiColonValues = false;
  var whitespace;
  var isAfterSpace;
  var previous_ch;
  while (true) {
    whitespace = this._input.read(whitespacePattern);
    isAfterSpace = whitespace !== "";
    previous_ch = topCharacter;
    this._ch = this._input.next();
    if (this._ch === "\\" && this._input.hasNext()) {
      this._ch += this._input.next();
    }
    topCharacter = this._ch;
    if (!this._ch) {
      break;
    } else if (this._ch === "/" && this._input.peek() === "*") {
      this._output.add_new_line();
      this._input.back();
      var comment = this._input.read(block_comment_pattern);
      var directives2 = directives_core$1.get_directives(comment);
      if (directives2 && directives2.ignore === "start") {
        comment += directives_core$1.readIgnored(this._input);
      }
      this.print_string(comment);
      this.eatWhitespace(true);
      this._output.add_new_line();
    } else if (this._ch === "/" && this._input.peek() === "/") {
      this._output.space_before_token = true;
      this._input.back();
      this.print_string(this._input.read(comment_pattern));
      this.eatWhitespace(true);
    } else if (this._ch === "@" || this._ch === "$") {
      this.preserveSingleSpace(isAfterSpace);
      if (this._input.peek() === "{") {
        this.print_string(this._ch + this.eatString("}"));
      } else {
        this.print_string(this._ch);
        var variableOrRule = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
        if (variableOrRule.match(/[ :]$/)) {
          variableOrRule = this.eatString(": ").replace(/\s$/, "");
          this.print_string(variableOrRule);
          this._output.space_before_token = true;
        }
        variableOrRule = variableOrRule.replace(/\s$/, "");
        if (variableOrRule === "extend") {
          insideAtExtend = true;
        } else if (variableOrRule === "import") {
          insideAtImport = true;
        }
        if (variableOrRule in this.NESTED_AT_RULE) {
          this._nestedLevel += 1;
          if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
            enteringConditionalGroup = true;
          }
        } else if (!insideRule && parenLevel === 0 && variableOrRule.indexOf(":") !== -1) {
          insidePropertyValue = true;
          this.indent();
        }
      }
    } else if (this._ch === "#" && this._input.peek() === "{") {
      this.preserveSingleSpace(isAfterSpace);
      this.print_string(this._ch + this.eatString("}"));
    } else if (this._ch === "{") {
      if (insidePropertyValue) {
        insidePropertyValue = false;
        this.outdent();
      }
      if (enteringConditionalGroup) {
        enteringConditionalGroup = false;
        insideRule = this._indentLevel >= this._nestedLevel;
      } else {
        insideRule = this._indentLevel >= this._nestedLevel - 1;
      }
      if (this._options.newline_between_rules && insideRule) {
        if (this._output.previous_line && this._output.previous_line.item(-1) !== "{") {
          this._output.ensure_empty_line_above("/", ",");
        }
      }
      this._output.space_before_token = true;
      if (this._options.brace_style === "expand") {
        this._output.add_new_line();
        this.print_string(this._ch);
        this.indent();
        this._output.set_indent(this._indentLevel);
      } else {
        if (previous_ch === "(") {
          this._output.space_before_token = false;
        } else if (previous_ch !== ",") {
          this.indent();
        }
        this.print_string(this._ch);
      }
      this.eatWhitespace(true);
      this._output.add_new_line();
    } else if (this._ch === "}") {
      this.outdent();
      this._output.add_new_line();
      if (previous_ch === "{") {
        this._output.trim(true);
      }
      insideAtImport = false;
      insideAtExtend = false;
      if (insidePropertyValue) {
        this.outdent();
        insidePropertyValue = false;
      }
      this.print_string(this._ch);
      insideRule = false;
      if (this._nestedLevel) {
        this._nestedLevel--;
      }
      this.eatWhitespace(true);
      this._output.add_new_line();
      if (this._options.newline_between_rules && !this._output.just_added_blankline()) {
        if (this._input.peek() !== "}") {
          this._output.add_new_line(true);
        }
      }
      if (this._input.peek() === ")") {
        this._output.trim(true);
        if (this._options.brace_style === "expand") {
          this._output.add_new_line(true);
        }
      }
    } else if (this._ch === ":") {
      for (var i = 0; i < this.NON_SEMICOLON_NEWLINE_PROPERTY.length; i++) {
        if (this._input.lookBack(this.NON_SEMICOLON_NEWLINE_PROPERTY[i])) {
          insideNonSemiColonValues = true;
          break;
        }
      }
      if ((insideRule || enteringConditionalGroup) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !insideAtExtend && parenLevel === 0) {
        this.print_string(":");
        if (!insidePropertyValue) {
          insidePropertyValue = true;
          this._output.space_before_token = true;
          this.eatWhitespace(true);
          this.indent();
        }
      } else {
        if (this._input.lookBack(" ")) {
          this._output.space_before_token = true;
        }
        if (this._input.peek() === ":") {
          this._ch = this._input.next();
          this.print_string("::");
        } else {
          this.print_string(":");
        }
      }
    } else if (this._ch === '"' || this._ch === "'") {
      var preserveQuoteSpace = previous_ch === '"' || previous_ch === "'";
      this.preserveSingleSpace(preserveQuoteSpace || isAfterSpace);
      this.print_string(this._ch + this.eatString(this._ch));
      this.eatWhitespace(true);
    } else if (this._ch === ";") {
      insideNonSemiColonValues = false;
      if (parenLevel === 0) {
        if (insidePropertyValue) {
          this.outdent();
          insidePropertyValue = false;
        }
        insideAtExtend = false;
        insideAtImport = false;
        this.print_string(this._ch);
        this.eatWhitespace(true);
        if (this._input.peek() !== "/") {
          this._output.add_new_line();
        }
      } else {
        this.print_string(this._ch);
        this.eatWhitespace(true);
        this._output.space_before_token = true;
      }
    } else if (this._ch === "(") {
      if (this._input.lookBack("url")) {
        this.print_string(this._ch);
        this.eatWhitespace();
        parenLevel++;
        this.indent();
        this._ch = this._input.next();
        if (this._ch === ")" || this._ch === '"' || this._ch === "'") {
          this._input.back();
        } else if (this._ch) {
          this.print_string(this._ch + this.eatString(")"));
          if (parenLevel) {
            parenLevel--;
            this.outdent();
          }
        }
      } else {
        var space_needed = false;
        if (this._input.lookBack("with")) {
          space_needed = true;
        }
        this.preserveSingleSpace(isAfterSpace || space_needed);
        this.print_string(this._ch);
        if (insidePropertyValue && previous_ch === "$" && this._options.selector_separator_newline) {
          this._output.add_new_line();
          insideScssMap = true;
        } else {
          this.eatWhitespace();
          parenLevel++;
          this.indent();
        }
      }
    } else if (this._ch === ")") {
      if (parenLevel) {
        parenLevel--;
        this.outdent();
      }
      if (insideScssMap && this._input.peek() === ";" && this._options.selector_separator_newline) {
        insideScssMap = false;
        this.outdent();
        this._output.add_new_line();
      }
      this.print_string(this._ch);
    } else if (this._ch === ",") {
      this.print_string(this._ch);
      this.eatWhitespace(true);
      if (this._options.selector_separator_newline && (!insidePropertyValue || insideScssMap) && parenLevel === 0 && !insideAtImport && !insideAtExtend) {
        this._output.add_new_line();
      } else {
        this._output.space_before_token = true;
      }
    } else if ((this._ch === ">" || this._ch === "+" || this._ch === "~") && !insidePropertyValue && parenLevel === 0) {
      if (this._options.space_around_combinator) {
        this._output.space_before_token = true;
        this.print_string(this._ch);
        this._output.space_before_token = true;
      } else {
        this.print_string(this._ch);
        this.eatWhitespace();
        if (this._ch && whitespaceChar.test(this._ch)) {
          this._ch = "";
        }
      }
    } else if (this._ch === "]") {
      this.print_string(this._ch);
    } else if (this._ch === "[") {
      this.preserveSingleSpace(isAfterSpace);
      this.print_string(this._ch);
    } else if (this._ch === "=") {
      this.eatWhitespace();
      this.print_string("=");
      if (whitespaceChar.test(this._ch)) {
        this._ch = "";
      }
    } else if (this._ch === "!" && !this._input.lookBack("\\")) {
      this._output.space_before_token = true;
      this.print_string(this._ch);
    } else {
      var preserveAfterSpace = previous_ch === '"' || previous_ch === "'";
      this.preserveSingleSpace(preserveAfterSpace || isAfterSpace);
      this.print_string(this._ch);
      if (!this._output.just_added_newline() && this._input.peek() === "\n" && insideNonSemiColonValues) {
        this._output.add_new_line();
      }
    }
  }
  var sweetCode = this._output.get_code(eol);
  return sweetCode;
};
beautifier$1.Beautifier = Beautifier$3;
var Beautifier$2 = beautifier$1.Beautifier, Options$3 = options$1.Options;
function css_beautify$1(source_text, options2) {
  var beautifier2 = new Beautifier$2(source_text, options2);
  return beautifier2.beautify();
}
css.exports = css_beautify$1;
css.exports.defaultOptions = function() {
  return new Options$3();
};
var html = { exports: {} };
var beautifier = {};
var options = {};
var BaseOptions = options$2.Options;
function Options$2(options2) {
  BaseOptions.call(this, options2, "html");
  if (this.templating.length === 1 && this.templating[0] === "auto") {
    this.templating = ["django", "erb", "handlebars", "php"];
  }
  this.indent_inner_html = this._get_boolean("indent_inner_html");
  this.indent_body_inner_html = this._get_boolean("indent_body_inner_html", true);
  this.indent_head_inner_html = this._get_boolean("indent_head_inner_html", true);
  this.indent_handlebars = this._get_boolean("indent_handlebars", true);
  this.wrap_attributes = this._get_selection("wrap_attributes", ["auto", "force", "force-aligned", "force-expand-multiline", "aligned-multiple", "preserve", "preserve-aligned"]);
  this.wrap_attributes_indent_size = this._get_number("wrap_attributes_indent_size", this.indent_size);
  this.extra_liners = this._get_array("extra_liners", ["head", "body", "/html"]);
  this.inline = this._get_array("inline", [
    "a",
    "abbr",
    "area",
    "audio",
    "b",
    "bdi",
    "bdo",
    "br",
    "button",
    "canvas",
    "cite",
    "code",
    "data",
    "datalist",
    "del",
    "dfn",
    "em",
    "embed",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "map",
    "mark",
    "math",
    "meter",
    "noscript",
    "object",
    "output",
    "progress",
    "q",
    "ruby",
    "s",
    "samp",
    "select",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "svg",
    "template",
    "textarea",
    "time",
    "u",
    "var",
    "video",
    "wbr",
    "text",
    "acronym",
    "big",
    "strike",
    "tt"
  ]);
  this.void_elements = this._get_array("void_elements", [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "menuitem",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
    "!doctype",
    "?xml",
    "basefont",
    "isindex"
  ]);
  this.unformatted = this._get_array("unformatted", []);
  this.content_unformatted = this._get_array("content_unformatted", [
    "pre",
    "textarea"
  ]);
  this.unformatted_content_delimiter = this._get_characters("unformatted_content_delimiter");
  this.indent_scripts = this._get_selection("indent_scripts", ["normal", "keep", "separate"]);
}
Options$2.prototype = new BaseOptions();
options.Options = Options$2;
var tokenizer = {};
var BaseTokenizer = tokenizer$1.Tokenizer;
var BASETOKEN = tokenizer$1.TOKEN;
var Directives = directives.Directives;
var TemplatablePattern = templatablepattern.TemplatablePattern;
var Pattern = pattern.Pattern;
var TOKEN$1 = {
  TAG_OPEN: "TK_TAG_OPEN",
  TAG_CLOSE: "TK_TAG_CLOSE",
  ATTRIBUTE: "TK_ATTRIBUTE",
  EQUALS: "TK_EQUALS",
  VALUE: "TK_VALUE",
  COMMENT: "TK_COMMENT",
  TEXT: "TK_TEXT",
  UNKNOWN: "TK_UNKNOWN",
  START: BASETOKEN.START,
  RAW: BASETOKEN.RAW,
  EOF: BASETOKEN.EOF
};
var directives_core = new Directives(/<\!--/, /-->/);
var Tokenizer$1 = function(input_string, options2) {
  BaseTokenizer.call(this, input_string, options2);
  this._current_tag_name = "";
  var templatable_reader = new TemplatablePattern(this._input).read_options(this._options);
  var pattern_reader = new Pattern(this._input);
  this.__patterns = {
    word: templatable_reader.until(/[\n\r\t <]/),
    single_quote: templatable_reader.until_after(/'/),
    double_quote: templatable_reader.until_after(/"/),
    attribute: templatable_reader.until(/[\n\r\t =>]|\/>/),
    element_name: templatable_reader.until(/[\n\r\t >\/]/),
    handlebars_comment: pattern_reader.starting_with(/{{!--/).until_after(/--}}/),
    handlebars: pattern_reader.starting_with(/{{/).until_after(/}}/),
    handlebars_open: pattern_reader.until(/[\n\r\t }]/),
    handlebars_raw_close: pattern_reader.until(/}}/),
    comment: pattern_reader.starting_with(/<!--/).until_after(/-->/),
    cdata: pattern_reader.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
    conditional_comment: pattern_reader.starting_with(/<!\[/).until_after(/]>/),
    processing: pattern_reader.starting_with(/<\?/).until_after(/\?>/)
  };
  if (this._options.indent_handlebars) {
    this.__patterns.word = this.__patterns.word.exclude("handlebars");
  }
  this._unformatted_content_delimiter = null;
  if (this._options.unformatted_content_delimiter) {
    var literal_regexp = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
    this.__patterns.unformatted_content_delimiter = pattern_reader.matching(literal_regexp).until_after(literal_regexp);
  }
};
Tokenizer$1.prototype = new BaseTokenizer();
Tokenizer$1.prototype._is_comment = function(current_token) {
  return false;
};
Tokenizer$1.prototype._is_opening = function(current_token) {
  return current_token.type === TOKEN$1.TAG_OPEN;
};
Tokenizer$1.prototype._is_closing = function(current_token, open_token) {
  return current_token.type === TOKEN$1.TAG_CLOSE && (open_token && ((current_token.text === ">" || current_token.text === "/>") && open_token.text[0] === "<" || current_token.text === "}}" && open_token.text[0] === "{" && open_token.text[1] === "{"));
};
Tokenizer$1.prototype._reset = function() {
  this._current_tag_name = "";
};
Tokenizer$1.prototype._get_next_token = function(previous_token, open_token) {
  var token2 = null;
  this._readWhitespace();
  var c = this._input.peek();
  if (c === null) {
    return this._create_token(TOKEN$1.EOF, "");
  }
  token2 = token2 || this._read_open_handlebars(c, open_token);
  token2 = token2 || this._read_attribute(c, previous_token, open_token);
  token2 = token2 || this._read_close(c, open_token);
  token2 = token2 || this._read_raw_content(c, previous_token, open_token);
  token2 = token2 || this._read_content_word(c);
  token2 = token2 || this._read_comment_or_cdata(c);
  token2 = token2 || this._read_processing(c);
  token2 = token2 || this._read_open(c, open_token);
  token2 = token2 || this._create_token(TOKEN$1.UNKNOWN, this._input.next());
  return token2;
};
Tokenizer$1.prototype._read_comment_or_cdata = function(c) {
  var token2 = null;
  var resulting_string = null;
  var directives2 = null;
  if (c === "<") {
    var peek1 = this._input.peek(1);
    if (peek1 === "!") {
      resulting_string = this.__patterns.comment.read();
      if (resulting_string) {
        directives2 = directives_core.get_directives(resulting_string);
        if (directives2 && directives2.ignore === "start") {
          resulting_string += directives_core.readIgnored(this._input);
        }
      } else {
        resulting_string = this.__patterns.cdata.read();
      }
    }
    if (resulting_string) {
      token2 = this._create_token(TOKEN$1.COMMENT, resulting_string);
      token2.directives = directives2;
    }
  }
  return token2;
};
Tokenizer$1.prototype._read_processing = function(c) {
  var token2 = null;
  var resulting_string = null;
  var directives2 = null;
  if (c === "<") {
    var peek1 = this._input.peek(1);
    if (peek1 === "!" || peek1 === "?") {
      resulting_string = this.__patterns.conditional_comment.read();
      resulting_string = resulting_string || this.__patterns.processing.read();
    }
    if (resulting_string) {
      token2 = this._create_token(TOKEN$1.COMMENT, resulting_string);
      token2.directives = directives2;
    }
  }
  return token2;
};
Tokenizer$1.prototype._read_open = function(c, open_token) {
  var resulting_string = null;
  var token2 = null;
  if (!open_token) {
    if (c === "<") {
      resulting_string = this._input.next();
      if (this._input.peek() === "/") {
        resulting_string += this._input.next();
      }
      resulting_string += this.__patterns.element_name.read();
      token2 = this._create_token(TOKEN$1.TAG_OPEN, resulting_string);
    }
  }
  return token2;
};
Tokenizer$1.prototype._read_open_handlebars = function(c, open_token) {
  var resulting_string = null;
  var token2 = null;
  if (!open_token) {
    if (this._options.indent_handlebars && c === "{" && this._input.peek(1) === "{") {
      if (this._input.peek(2) === "!") {
        resulting_string = this.__patterns.handlebars_comment.read();
        resulting_string = resulting_string || this.__patterns.handlebars.read();
        token2 = this._create_token(TOKEN$1.COMMENT, resulting_string);
      } else {
        resulting_string = this.__patterns.handlebars_open.read();
        token2 = this._create_token(TOKEN$1.TAG_OPEN, resulting_string);
      }
    }
  }
  return token2;
};
Tokenizer$1.prototype._read_close = function(c, open_token) {
  var resulting_string = null;
  var token2 = null;
  if (open_token) {
    if (open_token.text[0] === "<" && (c === ">" || c === "/" && this._input.peek(1) === ">")) {
      resulting_string = this._input.next();
      if (c === "/") {
        resulting_string += this._input.next();
      }
      token2 = this._create_token(TOKEN$1.TAG_CLOSE, resulting_string);
    } else if (open_token.text[0] === "{" && c === "}" && this._input.peek(1) === "}") {
      this._input.next();
      this._input.next();
      token2 = this._create_token(TOKEN$1.TAG_CLOSE, "}}");
    }
  }
  return token2;
};
Tokenizer$1.prototype._read_attribute = function(c, previous_token, open_token) {
  var token2 = null;
  var resulting_string = "";
  if (open_token && open_token.text[0] === "<") {
    if (c === "=") {
      token2 = this._create_token(TOKEN$1.EQUALS, this._input.next());
    } else if (c === '"' || c === "'") {
      var content = this._input.next();
      if (c === '"') {
        content += this.__patterns.double_quote.read();
      } else {
        content += this.__patterns.single_quote.read();
      }
      token2 = this._create_token(TOKEN$1.VALUE, content);
    } else {
      resulting_string = this.__patterns.attribute.read();
      if (resulting_string) {
        if (previous_token.type === TOKEN$1.EQUALS) {
          token2 = this._create_token(TOKEN$1.VALUE, resulting_string);
        } else {
          token2 = this._create_token(TOKEN$1.ATTRIBUTE, resulting_string);
        }
      }
    }
  }
  return token2;
};
Tokenizer$1.prototype._is_content_unformatted = function(tag_name) {
  return this._options.void_elements.indexOf(tag_name) === -1 && (this._options.content_unformatted.indexOf(tag_name) !== -1 || this._options.unformatted.indexOf(tag_name) !== -1);
};
Tokenizer$1.prototype._read_raw_content = function(c, previous_token, open_token) {
  var resulting_string = "";
  if (open_token && open_token.text[0] === "{") {
    resulting_string = this.__patterns.handlebars_raw_close.read();
  } else if (previous_token.type === TOKEN$1.TAG_CLOSE && previous_token.opened.text[0] === "<" && previous_token.text[0] !== "/") {
    var tag_name = previous_token.opened.text.substr(1).toLowerCase();
    if (tag_name === "script" || tag_name === "style") {
      var token2 = this._read_comment_or_cdata(c);
      if (token2) {
        token2.type = TOKEN$1.TEXT;
        return token2;
      }
      resulting_string = this._input.readUntil(new RegExp("</" + tag_name + "[\\n\\r\\t ]*?>", "ig"));
    } else if (this._is_content_unformatted(tag_name)) {
      resulting_string = this._input.readUntil(new RegExp("</" + tag_name + "[\\n\\r\\t ]*?>", "ig"));
    }
  }
  if (resulting_string) {
    return this._create_token(TOKEN$1.TEXT, resulting_string);
  }
  return null;
};
Tokenizer$1.prototype._read_content_word = function(c) {
  var resulting_string = "";
  if (this._options.unformatted_content_delimiter) {
    if (c === this._options.unformatted_content_delimiter[0]) {
      resulting_string = this.__patterns.unformatted_content_delimiter.read();
    }
  }
  if (!resulting_string) {
    resulting_string = this.__patterns.word.read();
  }
  if (resulting_string) {
    return this._create_token(TOKEN$1.TEXT, resulting_string);
  }
};
tokenizer.Tokenizer = Tokenizer$1;
tokenizer.TOKEN = TOKEN$1;
var Options$1 = options.Options;
var Output = output.Output;
var Tokenizer = tokenizer.Tokenizer;
var TOKEN = tokenizer.TOKEN;
var lineBreak = /\r\n|[\r\n]/;
var allLineBreaks = /\r\n|[\r\n]/g;
var Printer = function(options2, base_indent_string) {
  this.indent_level = 0;
  this.alignment_size = 0;
  this.max_preserve_newlines = options2.max_preserve_newlines;
  this.preserve_newlines = options2.preserve_newlines;
  this._output = new Output(options2, base_indent_string);
};
Printer.prototype.current_line_has_match = function(pattern2) {
  return this._output.current_line.has_match(pattern2);
};
Printer.prototype.set_space_before_token = function(value, non_breaking) {
  this._output.space_before_token = value;
  this._output.non_breaking_space = non_breaking;
};
Printer.prototype.set_wrap_point = function() {
  this._output.set_indent(this.indent_level, this.alignment_size);
  this._output.set_wrap_point();
};
Printer.prototype.add_raw_token = function(token2) {
  this._output.add_raw_token(token2);
};
Printer.prototype.print_preserved_newlines = function(raw_token) {
  var newlines = 0;
  if (raw_token.type !== TOKEN.TEXT && raw_token.previous.type !== TOKEN.TEXT) {
    newlines = raw_token.newlines ? 1 : 0;
  }
  if (this.preserve_newlines) {
    newlines = raw_token.newlines < this.max_preserve_newlines + 1 ? raw_token.newlines : this.max_preserve_newlines + 1;
  }
  for (var n = 0; n < newlines; n++) {
    this.print_newline(n > 0);
  }
  return newlines !== 0;
};
Printer.prototype.traverse_whitespace = function(raw_token) {
  if (raw_token.whitespace_before || raw_token.newlines) {
    if (!this.print_preserved_newlines(raw_token)) {
      this._output.space_before_token = true;
    }
    return true;
  }
  return false;
};
Printer.prototype.previous_token_wrapped = function() {
  return this._output.previous_token_wrapped;
};
Printer.prototype.print_newline = function(force) {
  this._output.add_new_line(force);
};
Printer.prototype.print_token = function(token2) {
  if (token2.text) {
    this._output.set_indent(this.indent_level, this.alignment_size);
    this._output.add_token(token2.text);
  }
};
Printer.prototype.indent = function() {
  this.indent_level++;
};
Printer.prototype.get_full_indent = function(level) {
  level = this.indent_level + (level || 0);
  if (level < 1) {
    return "";
  }
  return this._output.get_indent_string(level);
};
var get_type_attribute = function(start_token) {
  var result = null;
  var raw_token = start_token.next;
  while (raw_token.type !== TOKEN.EOF && start_token.closed !== raw_token) {
    if (raw_token.type === TOKEN.ATTRIBUTE && raw_token.text === "type") {
      if (raw_token.next && raw_token.next.type === TOKEN.EQUALS && raw_token.next.next && raw_token.next.next.type === TOKEN.VALUE) {
        result = raw_token.next.next.text;
      }
      break;
    }
    raw_token = raw_token.next;
  }
  return result;
};
var get_custom_beautifier_name = function(tag_check, raw_token) {
  var typeAttribute = null;
  var result = null;
  if (!raw_token.closed) {
    return null;
  }
  if (tag_check === "script") {
    typeAttribute = "text/javascript";
  } else if (tag_check === "style") {
    typeAttribute = "text/css";
  }
  typeAttribute = get_type_attribute(raw_token) || typeAttribute;
  if (typeAttribute.search("text/css") > -1) {
    result = "css";
  } else if (typeAttribute.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1) {
    result = "javascript";
  } else if (typeAttribute.search(/(text|application|dojo)\/(x-)?(html)/) > -1) {
    result = "html";
  } else if (typeAttribute.search(/test\/null/) > -1) {
    result = "null";
  }
  return result;
};
function in_array(what, arr) {
  return arr.indexOf(what) !== -1;
}
function TagFrame(parent, parser_token, indent_level) {
  this.parent = parent || null;
  this.tag = parser_token ? parser_token.tag_name : "";
  this.indent_level = indent_level || 0;
  this.parser_token = parser_token || null;
}
function TagStack(printer) {
  this._printer = printer;
  this._current_frame = null;
}
TagStack.prototype.get_parser_token = function() {
  return this._current_frame ? this._current_frame.parser_token : null;
};
TagStack.prototype.record_tag = function(parser_token) {
  var new_frame = new TagFrame(this._current_frame, parser_token, this._printer.indent_level);
  this._current_frame = new_frame;
};
TagStack.prototype._try_pop_frame = function(frame) {
  var parser_token = null;
  if (frame) {
    parser_token = frame.parser_token;
    this._printer.indent_level = frame.indent_level;
    this._current_frame = frame.parent;
  }
  return parser_token;
};
TagStack.prototype._get_frame = function(tag_list, stop_list) {
  var frame = this._current_frame;
  while (frame) {
    if (tag_list.indexOf(frame.tag) !== -1) {
      break;
    } else if (stop_list && stop_list.indexOf(frame.tag) !== -1) {
      frame = null;
      break;
    }
    frame = frame.parent;
  }
  return frame;
};
TagStack.prototype.try_pop = function(tag, stop_list) {
  var frame = this._get_frame([tag], stop_list);
  return this._try_pop_frame(frame);
};
TagStack.prototype.indent_to_tag = function(tag_list) {
  var frame = this._get_frame(tag_list);
  if (frame) {
    this._printer.indent_level = frame.indent_level;
  }
};
function Beautifier$1(source_text, options2, js_beautify2, css_beautify2) {
  this._source_text = source_text || "";
  options2 = options2 || {};
  this._js_beautify = js_beautify2;
  this._css_beautify = css_beautify2;
  this._tag_stack = null;
  var optionHtml = new Options$1(options2, "html");
  this._options = optionHtml;
  this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, "force".length) === "force";
  this._is_wrap_attributes_force_expand_multiline = this._options.wrap_attributes === "force-expand-multiline";
  this._is_wrap_attributes_force_aligned = this._options.wrap_attributes === "force-aligned";
  this._is_wrap_attributes_aligned_multiple = this._options.wrap_attributes === "aligned-multiple";
  this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, "preserve".length) === "preserve";
  this._is_wrap_attributes_preserve_aligned = this._options.wrap_attributes === "preserve-aligned";
}
Beautifier$1.prototype.beautify = function() {
  if (this._options.disabled) {
    return this._source_text;
  }
  var source_text = this._source_text;
  var eol = this._options.eol;
  if (this._options.eol === "auto") {
    eol = "\n";
    if (source_text && lineBreak.test(source_text)) {
      eol = source_text.match(lineBreak)[0];
    }
  }
  source_text = source_text.replace(allLineBreaks, "\n");
  var baseIndentString = source_text.match(/^[\t ]*/)[0];
  var last_token = {
    text: "",
    type: ""
  };
  var last_tag_token = new TagOpenParserToken();
  var printer = new Printer(this._options, baseIndentString);
  var tokens = new Tokenizer(source_text, this._options).tokenize();
  this._tag_stack = new TagStack(printer);
  var parser_token = null;
  var raw_token = tokens.next();
  while (raw_token.type !== TOKEN.EOF) {
    if (raw_token.type === TOKEN.TAG_OPEN || raw_token.type === TOKEN.COMMENT) {
      parser_token = this._handle_tag_open(printer, raw_token, last_tag_token, last_token);
      last_tag_token = parser_token;
    } else if (raw_token.type === TOKEN.ATTRIBUTE || raw_token.type === TOKEN.EQUALS || raw_token.type === TOKEN.VALUE || raw_token.type === TOKEN.TEXT && !last_tag_token.tag_complete) {
      parser_token = this._handle_inside_tag(printer, raw_token, last_tag_token, tokens);
    } else if (raw_token.type === TOKEN.TAG_CLOSE) {
      parser_token = this._handle_tag_close(printer, raw_token, last_tag_token);
    } else if (raw_token.type === TOKEN.TEXT) {
      parser_token = this._handle_text(printer, raw_token, last_tag_token);
    } else {
      printer.add_raw_token(raw_token);
    }
    last_token = parser_token;
    raw_token = tokens.next();
  }
  var sweet_code = printer._output.get_code(eol);
  return sweet_code;
};
Beautifier$1.prototype._handle_tag_close = function(printer, raw_token, last_tag_token) {
  var parser_token = {
    text: raw_token.text,
    type: raw_token.type
  };
  printer.alignment_size = 0;
  last_tag_token.tag_complete = true;
  printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
  if (last_tag_token.is_unformatted) {
    printer.add_raw_token(raw_token);
  } else {
    if (last_tag_token.tag_start_char === "<") {
      printer.set_space_before_token(raw_token.text[0] === "/", true);
      if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.has_wrapped_attrs) {
        printer.print_newline(false);
      }
    }
    printer.print_token(raw_token);
  }
  if (last_tag_token.indent_content && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
    printer.indent();
    last_tag_token.indent_content = false;
  }
  if (!last_tag_token.is_inline_element && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
    printer.set_wrap_point();
  }
  return parser_token;
};
Beautifier$1.prototype._handle_inside_tag = function(printer, raw_token, last_tag_token, tokens) {
  var wrapped = last_tag_token.has_wrapped_attrs;
  var parser_token = {
    text: raw_token.text,
    type: raw_token.type
  };
  printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
  if (last_tag_token.is_unformatted) {
    printer.add_raw_token(raw_token);
  } else if (last_tag_token.tag_start_char === "{" && raw_token.type === TOKEN.TEXT) {
    if (printer.print_preserved_newlines(raw_token)) {
      raw_token.newlines = 0;
      printer.add_raw_token(raw_token);
    } else {
      printer.print_token(raw_token);
    }
  } else {
    if (raw_token.type === TOKEN.ATTRIBUTE) {
      printer.set_space_before_token(true);
      last_tag_token.attr_count += 1;
    } else if (raw_token.type === TOKEN.EQUALS) {
      printer.set_space_before_token(false);
    } else if (raw_token.type === TOKEN.VALUE && raw_token.previous.type === TOKEN.EQUALS) {
      printer.set_space_before_token(false);
    }
    if (raw_token.type === TOKEN.ATTRIBUTE && last_tag_token.tag_start_char === "<") {
      if (this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) {
        printer.traverse_whitespace(raw_token);
        wrapped = wrapped || raw_token.newlines !== 0;
      }
      if (this._is_wrap_attributes_force) {
        var force_attr_wrap = last_tag_token.attr_count > 1;
        if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.attr_count === 1) {
          var is_only_attribute = true;
          var peek_index = 0;
          var peek_token;
          do {
            peek_token = tokens.peek(peek_index);
            if (peek_token.type === TOKEN.ATTRIBUTE) {
              is_only_attribute = false;
              break;
            }
            peek_index += 1;
          } while (peek_index < 4 && peek_token.type !== TOKEN.EOF && peek_token.type !== TOKEN.TAG_CLOSE);
          force_attr_wrap = !is_only_attribute;
        }
        if (force_attr_wrap) {
          printer.print_newline(false);
          wrapped = true;
        }
      }
    }
    printer.print_token(raw_token);
    wrapped = wrapped || printer.previous_token_wrapped();
    last_tag_token.has_wrapped_attrs = wrapped;
  }
  return parser_token;
};
Beautifier$1.prototype._handle_text = function(printer, raw_token, last_tag_token) {
  var parser_token = {
    text: raw_token.text,
    type: "TK_CONTENT"
  };
  if (last_tag_token.custom_beautifier_name) {
    this._print_custom_beatifier_text(printer, raw_token, last_tag_token);
  } else if (last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) {
    printer.add_raw_token(raw_token);
  } else {
    printer.traverse_whitespace(raw_token);
    printer.print_token(raw_token);
  }
  return parser_token;
};
Beautifier$1.prototype._print_custom_beatifier_text = function(printer, raw_token, last_tag_token) {
  var local = this;
  if (raw_token.text !== "") {
    var text = raw_token.text, _beautifier, script_indent_level = 1, pre = "", post = "";
    if (last_tag_token.custom_beautifier_name === "javascript" && typeof this._js_beautify === "function") {
      _beautifier = this._js_beautify;
    } else if (last_tag_token.custom_beautifier_name === "css" && typeof this._css_beautify === "function") {
      _beautifier = this._css_beautify;
    } else if (last_tag_token.custom_beautifier_name === "html") {
      _beautifier = function(html_source, options2) {
        var beautifier2 = new Beautifier$1(html_source, options2, local._js_beautify, local._css_beautify);
        return beautifier2.beautify();
      };
    }
    if (this._options.indent_scripts === "keep") {
      script_indent_level = 0;
    } else if (this._options.indent_scripts === "separate") {
      script_indent_level = -printer.indent_level;
    }
    var indentation = printer.get_full_indent(script_indent_level);
    text = text.replace(/\n[ \t]*$/, "");
    if (last_tag_token.custom_beautifier_name !== "html" && text[0] === "<" && text.match(/^(<!--|<!\[CDATA\[)/)) {
      var matched = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(text);
      if (!matched) {
        printer.add_raw_token(raw_token);
        return;
      }
      pre = indentation + matched[1] + "\n";
      text = matched[4];
      if (matched[5]) {
        post = indentation + matched[5];
      }
      text = text.replace(/\n[ \t]*$/, "");
      if (matched[2] || matched[3].indexOf("\n") !== -1) {
        matched = matched[3].match(/[ \t]+$/);
        if (matched) {
          raw_token.whitespace_before = matched[0];
        }
      }
    }
    if (text) {
      if (_beautifier) {
        var Child_options = function() {
          this.eol = "\n";
        };
        Child_options.prototype = this._options.raw_options;
        var child_options = new Child_options();
        text = _beautifier(indentation + text, child_options);
      } else {
        var white = raw_token.whitespace_before;
        if (white) {
          text = text.replace(new RegExp("\n(" + white + ")?", "g"), "\n");
        }
        text = indentation + text.replace(/\n/g, "\n" + indentation);
      }
    }
    if (pre) {
      if (!text) {
        text = pre + post;
      } else {
        text = pre + text + "\n" + post;
      }
    }
    printer.print_newline(false);
    if (text) {
      raw_token.text = text;
      raw_token.whitespace_before = "";
      raw_token.newlines = 0;
      printer.add_raw_token(raw_token);
      printer.print_newline(true);
    }
  }
};
Beautifier$1.prototype._handle_tag_open = function(printer, raw_token, last_tag_token, last_token) {
  var parser_token = this._get_tag_open_token(raw_token);
  if ((last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) && !last_tag_token.is_empty_element && raw_token.type === TOKEN.TAG_OPEN && raw_token.text.indexOf("</") === 0) {
    printer.add_raw_token(raw_token);
    parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
  } else {
    printer.traverse_whitespace(raw_token);
    this._set_tag_position(printer, raw_token, parser_token, last_tag_token, last_token);
    if (!parser_token.is_inline_element) {
      printer.set_wrap_point();
    }
    printer.print_token(raw_token);
  }
  if (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) {
    parser_token.alignment_size = raw_token.text.length + 1;
  }
  if (!parser_token.tag_complete && !parser_token.is_unformatted) {
    printer.alignment_size = parser_token.alignment_size;
  }
  return parser_token;
};
var TagOpenParserToken = function(parent, raw_token) {
  this.parent = parent || null;
  this.text = "";
  this.type = "TK_TAG_OPEN";
  this.tag_name = "";
  this.is_inline_element = false;
  this.is_unformatted = false;
  this.is_content_unformatted = false;
  this.is_empty_element = false;
  this.is_start_tag = false;
  this.is_end_tag = false;
  this.indent_content = false;
  this.multiline_content = false;
  this.custom_beautifier_name = null;
  this.start_tag_token = null;
  this.attr_count = 0;
  this.has_wrapped_attrs = false;
  this.alignment_size = 0;
  this.tag_complete = false;
  this.tag_start_char = "";
  this.tag_check = "";
  if (!raw_token) {
    this.tag_complete = true;
  } else {
    var tag_check_match;
    this.tag_start_char = raw_token.text[0];
    this.text = raw_token.text;
    if (this.tag_start_char === "<") {
      tag_check_match = raw_token.text.match(/^<([^\s>]*)/);
      this.tag_check = tag_check_match ? tag_check_match[1] : "";
    } else {
      tag_check_match = raw_token.text.match(/^{{~?(?:[\^]|#\*?)?([^\s}]+)/);
      this.tag_check = tag_check_match ? tag_check_match[1] : "";
      if ((raw_token.text.startsWith("{{#>") || raw_token.text.startsWith("{{~#>")) && this.tag_check[0] === ">") {
        if (this.tag_check === ">" && raw_token.next !== null) {
          this.tag_check = raw_token.next.text.split(" ")[0];
        } else {
          this.tag_check = raw_token.text.split(">")[1];
        }
      }
    }
    this.tag_check = this.tag_check.toLowerCase();
    if (raw_token.type === TOKEN.COMMENT) {
      this.tag_complete = true;
    }
    this.is_start_tag = this.tag_check.charAt(0) !== "/";
    this.tag_name = !this.is_start_tag ? this.tag_check.substr(1) : this.tag_check;
    this.is_end_tag = !this.is_start_tag || raw_token.closed && raw_token.closed.text === "/>";
    var handlebar_starts = 2;
    if (this.tag_start_char === "{" && this.text.length >= 3) {
      if (this.text.charAt(2) === "~") {
        handlebar_starts = 3;
      }
    }
    this.is_end_tag = this.is_end_tag || this.tag_start_char === "{" && (this.text.length < 3 || /[^#\^]/.test(this.text.charAt(handlebar_starts)));
  }
};
Beautifier$1.prototype._get_tag_open_token = function(raw_token) {
  var parser_token = new TagOpenParserToken(this._tag_stack.get_parser_token(), raw_token);
  parser_token.alignment_size = this._options.wrap_attributes_indent_size;
  parser_token.is_end_tag = parser_token.is_end_tag || in_array(parser_token.tag_check, this._options.void_elements);
  parser_token.is_empty_element = parser_token.tag_complete || parser_token.is_start_tag && parser_token.is_end_tag;
  parser_token.is_unformatted = !parser_token.tag_complete && in_array(parser_token.tag_check, this._options.unformatted);
  parser_token.is_content_unformatted = !parser_token.is_empty_element && in_array(parser_token.tag_check, this._options.content_unformatted);
  parser_token.is_inline_element = in_array(parser_token.tag_name, this._options.inline) || parser_token.tag_start_char === "{";
  return parser_token;
};
Beautifier$1.prototype._set_tag_position = function(printer, raw_token, parser_token, last_tag_token, last_token) {
  if (!parser_token.is_empty_element) {
    if (parser_token.is_end_tag) {
      parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
    } else {
      if (this._do_optional_end_element(parser_token)) {
        if (!parser_token.is_inline_element) {
          printer.print_newline(false);
        }
      }
      this._tag_stack.record_tag(parser_token);
      if ((parser_token.tag_name === "script" || parser_token.tag_name === "style") && !(parser_token.is_unformatted || parser_token.is_content_unformatted)) {
        parser_token.custom_beautifier_name = get_custom_beautifier_name(parser_token.tag_check, raw_token);
      }
    }
  }
  if (in_array(parser_token.tag_check, this._options.extra_liners)) {
    printer.print_newline(false);
    if (!printer._output.just_added_blankline()) {
      printer.print_newline(true);
    }
  }
  if (parser_token.is_empty_element) {
    if (parser_token.tag_start_char === "{" && parser_token.tag_check === "else") {
      this._tag_stack.indent_to_tag(["if", "unless", "each"]);
      parser_token.indent_content = true;
      var foundIfOnCurrentLine = printer.current_line_has_match(/{{#if/);
      if (!foundIfOnCurrentLine) {
        printer.print_newline(false);
      }
    }
    if (parser_token.tag_name === "!--" && last_token.type === TOKEN.TAG_CLOSE && last_tag_token.is_end_tag && parser_token.text.indexOf("\n") === -1)
      ;
    else {
      if (!(parser_token.is_inline_element || parser_token.is_unformatted)) {
        printer.print_newline(false);
      }
      this._calcluate_parent_multiline(printer, parser_token);
    }
  } else if (parser_token.is_end_tag) {
    var do_end_expand = false;
    do_end_expand = parser_token.start_tag_token && parser_token.start_tag_token.multiline_content;
    do_end_expand = do_end_expand || !parser_token.is_inline_element && !(last_tag_token.is_inline_element || last_tag_token.is_unformatted) && !(last_token.type === TOKEN.TAG_CLOSE && parser_token.start_tag_token === last_tag_token) && last_token.type !== "TK_CONTENT";
    if (parser_token.is_content_unformatted || parser_token.is_unformatted) {
      do_end_expand = false;
    }
    if (do_end_expand) {
      printer.print_newline(false);
    }
  } else {
    parser_token.indent_content = !parser_token.custom_beautifier_name;
    if (parser_token.tag_start_char === "<") {
      if (parser_token.tag_name === "html") {
        parser_token.indent_content = this._options.indent_inner_html;
      } else if (parser_token.tag_name === "head") {
        parser_token.indent_content = this._options.indent_head_inner_html;
      } else if (parser_token.tag_name === "body") {
        parser_token.indent_content = this._options.indent_body_inner_html;
      }
    }
    if (!(parser_token.is_inline_element || parser_token.is_unformatted) && (last_token.type !== "TK_CONTENT" || parser_token.is_content_unformatted)) {
      printer.print_newline(false);
    }
    this._calcluate_parent_multiline(printer, parser_token);
  }
};
Beautifier$1.prototype._calcluate_parent_multiline = function(printer, parser_token) {
  if (parser_token.parent && printer._output.just_added_newline() && !((parser_token.is_inline_element || parser_token.is_unformatted) && parser_token.parent.is_inline_element)) {
    parser_token.parent.multiline_content = true;
  }
};
var p_closers = ["address", "article", "aside", "blockquote", "details", "div", "dl", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "main", "nav", "ol", "p", "pre", "section", "table", "ul"];
var p_parent_excludes = ["a", "audio", "del", "ins", "map", "noscript", "video"];
Beautifier$1.prototype._do_optional_end_element = function(parser_token) {
  var result = null;
  if (parser_token.is_empty_element || !parser_token.is_start_tag || !parser_token.parent) {
    return;
  }
  if (parser_token.tag_name === "body") {
    result = result || this._tag_stack.try_pop("head");
  } else if (parser_token.tag_name === "li") {
    result = result || this._tag_stack.try_pop("li", ["ol", "ul"]);
  } else if (parser_token.tag_name === "dd" || parser_token.tag_name === "dt") {
    result = result || this._tag_stack.try_pop("dt", ["dl"]);
    result = result || this._tag_stack.try_pop("dd", ["dl"]);
  } else if (parser_token.parent.tag_name === "p" && p_closers.indexOf(parser_token.tag_name) !== -1) {
    var p_parent = parser_token.parent.parent;
    if (!p_parent || p_parent_excludes.indexOf(p_parent.tag_name) === -1) {
      result = result || this._tag_stack.try_pop("p");
    }
  } else if (parser_token.tag_name === "rp" || parser_token.tag_name === "rt") {
    result = result || this._tag_stack.try_pop("rt", ["ruby", "rtc"]);
    result = result || this._tag_stack.try_pop("rp", ["ruby", "rtc"]);
  } else if (parser_token.tag_name === "optgroup") {
    result = result || this._tag_stack.try_pop("optgroup", ["select"]);
  } else if (parser_token.tag_name === "option") {
    result = result || this._tag_stack.try_pop("option", ["select", "datalist", "optgroup"]);
  } else if (parser_token.tag_name === "colgroup") {
    result = result || this._tag_stack.try_pop("caption", ["table"]);
  } else if (parser_token.tag_name === "thead") {
    result = result || this._tag_stack.try_pop("caption", ["table"]);
    result = result || this._tag_stack.try_pop("colgroup", ["table"]);
  } else if (parser_token.tag_name === "tbody" || parser_token.tag_name === "tfoot") {
    result = result || this._tag_stack.try_pop("caption", ["table"]);
    result = result || this._tag_stack.try_pop("colgroup", ["table"]);
    result = result || this._tag_stack.try_pop("thead", ["table"]);
    result = result || this._tag_stack.try_pop("tbody", ["table"]);
  } else if (parser_token.tag_name === "tr") {
    result = result || this._tag_stack.try_pop("caption", ["table"]);
    result = result || this._tag_stack.try_pop("colgroup", ["table"]);
    result = result || this._tag_stack.try_pop("tr", ["table", "thead", "tbody", "tfoot"]);
  } else if (parser_token.tag_name === "th" || parser_token.tag_name === "td") {
    result = result || this._tag_stack.try_pop("td", ["table", "thead", "tbody", "tfoot", "tr"]);
    result = result || this._tag_stack.try_pop("th", ["table", "thead", "tbody", "tfoot", "tr"]);
  }
  parser_token.parent = this._tag_stack.get_parser_token();
  return result;
};
beautifier.Beautifier = Beautifier$1;
var Beautifier = beautifier.Beautifier, Options = options.Options;
function style_html$1(html_source, options2, js_beautify2, css_beautify2) {
  var beautifier2 = new Beautifier(html_source, options2, js_beautify2, css_beautify2);
  return beautifier2.beautify();
}
html.exports = style_html$1;
html.exports.defaultOptions = function() {
  return new Options();
};
var js_beautify = javascript.exports;
var css_beautify = css.exports;
var html_beautify = html.exports;
function style_html(html_source, options2, js2, css2) {
  js2 = js2 || js_beautify;
  css2 = css2 || css_beautify;
  return html_beautify(html_source, options2, js2, css2);
}
style_html.defaultOptions = html_beautify.defaultOptions;
src.js = js_beautify;
src.css = css_beautify;
src.html = style_html;
(function(module) {
  function get_beautify(js_beautify2, css_beautify2, html_beautify2) {
    var beautify = function(src2, config) {
      return js_beautify2.js_beautify(src2, config);
    };
    beautify.js = js_beautify2.js_beautify;
    beautify.css = css_beautify2.css_beautify;
    beautify.html = html_beautify2.html_beautify;
    beautify.js_beautify = js_beautify2.js_beautify;
    beautify.css_beautify = css_beautify2.css_beautify;
    beautify.html_beautify = html_beautify2.html_beautify;
    return beautify;
  }
  {
    (function(mod) {
      var beautifier2 = src;
      beautifier2.js_beautify = beautifier2.js;
      beautifier2.css_beautify = beautifier2.css;
      beautifier2.html_beautify = beautifier2.html;
      mod.exports = get_beautify(beautifier2, beautifier2, beautifier2);
    })(module);
  }
})(js);
const EmailRenderContext = React.createContext({});
const EmailRenderProvider = (props) => {
  return /* @__PURE__ */ React.createElement(EmailRenderContext.Provider, {
    value: props
  }, props.children);
};
function JsonToMjml(options2) {
  const { data, beautify } = options2;
  const block = BlockManager.getBlockByType(data.type);
  if (!block) {
    throw new Error(`Block ${data.type} not found`);
  }
  const mjmlString = unescape(renderToStaticMarkup(/* @__PURE__ */ React.createElement(EmailRenderProvider, {
    dataSource: options2.dataSource,
    mode: options2.mode,
    context: options2.context
  }, block.render(options2))));
  if (beautify) {
    return js.exports.html(mjmlString, { indent_size: 2 });
  }
  return mjmlString;
}
const useEmailRenderContext = () => {
  return useContext(EmailRenderContext);
};
const BlockRenderer = (props) => {
  const { data } = props;
  const { mode, context, dataSource } = useEmailRenderContext();
  const block = BlockManager.getBlockByType(data.type);
  if (!block)
    return null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, block.render(__spreadProps(__spreadValues({}, props), { mode, context, dataSource })));
};
function BasicBlock(props) {
  const {
    params,
    params: { data, idx, children: children2, mode },
    tag,
    children
  } = props;
  const placeholder = data.children.length === 0 && getPlaceholder(params);
  let content = children || children2;
  if ((!content || Array.isArray(content) && content.length === 0) && data.children.length === 0) {
    content = placeholder;
  }
  if (mode === "testing" && tag === "mj-image") {
    let url = data.attributes.src;
    if (url === "" || /{{([\s\S]+?)}}/g.test(url) || /\*\|([^\|\*]+)\|\*/g.test(url)) {
      const adapterData = omit(params, "data.attributes.src");
      return /* @__PURE__ */ React.createElement(React.Fragment, null, `<${tag} ${getAdapterAttributesString(adapterData)} src="${getImg("IMAGE_59")}">`, `</${tag}>`);
    }
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, `<${tag} ${getAdapterAttributesString(params)}>`, content || data.children.map((child, index2) => /* @__PURE__ */ React.createElement(BlockRenderer, __spreadProps(__spreadValues({
    key: index2
  }, params), {
    idx: idx ? getChildIdx(idx, index2) : null,
    data: child
  }))), `</${tag}>`);
}
const Wrapper$1 = createBlock({
  name: "Wrapper",
  type: BasicType.WRAPPER,
  create: (payload) => {
    const defaultData = {
      type: BasicType.WRAPPER,
      data: {
        value: {}
      },
      attributes: {
        padding: "20px 0px 20px 0px",
        border: "none",
        direction: "ltr",
        "text-align": "center"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-wrapper"
    });
  }
});
function generaMjmlMetaData(data) {
  const values = data.data.value;
  const attributes = [
    "content-background-color",
    "text-color",
    "font-family",
    "font-size",
    "line-height",
    "font-weight",
    "user-style",
    "responsive"
  ];
  return `
    <mj-html-attributes>
      ${attributes.filter((key) => values[key] !== void 0).map((key) => {
    const attKey = key;
    const isMultipleAttributes = isObject$6(values[attKey]);
    const value = isMultipleAttributes ? Object.keys(values[attKey]).map((childKey) => {
      const childValue = values[attKey][childKey];
      return `${childKey}="${isString(childValue) ? childValue.replace(/"/gm, "") : childValue}"`;
    }).join(" ") : `${key}="${values[attKey]}"`;
    return `<mj-html-attribute class="easy-email" multiple-attributes="${isMultipleAttributes}" attribute-name="${key}" ${value}></mj-html-attribute>`;
  }).join("\n")}

    </mj-html-attributes>
  `;
}
const Page$1 = createBlock({
  name: "Page",
  type: BasicType.PAGE,
  create: (payload) => {
    const defaultData = {
      type: BasicType.PAGE,
      data: {
        value: {
          breakpoint: "480px",
          headAttributes: "",
          "font-size": "14px",
          "font-weight": "400",
          "line-height": "1.7",
          headStyles: [],
          fonts: [],
          responsive: true,
          "font-family": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif",
          "text-color": "#000000"
        }
      },
      attributes: {
        "background-color": "#efeeea",
        width: "600px"
      },
      children: [Wrapper$1.create()]
    };
    return merge(defaultData, payload);
  },
  validParentType: [],
  render(params) {
    var _a, _b;
    const { data } = params;
    const metaData = generaMjmlMetaData(data);
    const value = data.data.value;
    const breakpoint = value.breakpoint ? `<mj-breakpoint width="${data.data.value.breakpoint}" />` : "";
    const nonResponsive = !value.responsive ? `<mj-raw>
            <meta name="viewport" />
           </mj-raw>
           <mj-style inline="inline">.mjml-body { width: ${data.attributes.width || "600px"}; margin: 0px auto; }</mj-style>` : "";
    const styles = ((_a = value.headStyles) == null ? void 0 : _a.map((style) => `<mj-style ${style.inline ? 'inline="inline"' : ""}>${style.content}</mj-style>`).join("\n")) || "";
    const userStyle = value["user-style"] ? `<mj-style ${value["user-style"].inline ? 'inline="inline"' : ""}>${value["user-style"].content}</mj-style>` : "";
    const extraHeadContent = value.extraHeadContent ? `<mj-raw>${value.extraHeadContent}</mj-raw>` : "";
    return /* @__PURE__ */ React.createElement(React.Fragment, null, `
          <mjml>
          <mj-head>
              ${metaData}
              ${nonResponsive}
              ${styles}
              ${userStyle}
              ${breakpoint}
              ${extraHeadContent}
              ${(_b = value.fonts) == null ? void 0 : _b.filter(Boolean).map((item) => `<mj-font name="${item.name}" href="${item.href}" />`)}
            <mj-attributes>
              ${value.headAttributes}
              ${value["font-family"] ? `<mj-all font-family="${value["font-family"].replace(/"/gm, "")}" />` : ""}
              ${value["font-size"] ? `<mj-text font-size="${value["font-size"]}" />` : ""}
              ${value["text-color"] ? `<mj-text color="${value["text-color"]}" />` : ""}
        ${value["line-height"] ? `<mj-text line-height="${value["line-height"]}" />` : ""}
        ${value["font-weight"] ? `<mj-text font-weight="${value["font-weight"]}" />` : ""}
              ${value["content-background-color"] ? `<mj-wrapper background-color="${value["content-background-color"]}" />
             <mj-section background-color="${value["content-background-color"]}" />
            ` : ""}

            </mj-attributes>
          </mj-head>
          <mj-body ${getAdapterAttributesString(params)}>`, data.children.map((child, index2) => /* @__PURE__ */ React.createElement(BlockRenderer, __spreadProps(__spreadValues({}, params), {
      idx: getChildIdx(getPageIdx(), index2),
      key: index2,
      data: child
    }))), "</mj-body></mjml > ");
  }
});
const Section$1 = createBlock({
  name: "Section",
  type: BasicType.SECTION,
  create: (payload) => {
    const defaultData = {
      type: BasicType.SECTION,
      data: {
        value: {
          noWrap: false
        }
      },
      attributes: {
        padding: "20px 0px 20px 0px",
        "background-repeat": "repeat",
        "background-size": "auto",
        "background-position": "top center",
        border: "none",
        direction: "ltr",
        "text-align": "center"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE, BasicType.WRAPPER],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-section"
    });
  }
});
const Column$1 = createBlock({
  name: "Column",
  type: BasicType.COLUMN,
  create: (payload) => {
    const defaultData = {
      type: BasicType.COLUMN,
      data: {
        value: {}
      },
      attributes: {
        padding: "0px 0px 0px 0px",
        border: "none",
        "vertical-align": "top"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.SECTION, BasicType.GROUP],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-column"
    });
  }
});
const Text$1 = createBlock({
  name: "Text",
  type: BasicType.TEXT,
  create: (payload) => {
    const defaultData = {
      type: BasicType.TEXT,
      data: {
        value: {
          content: "Make it easy for everyone to compose emails!"
        }
      },
      attributes: {
        padding: "10px 25px 10px 25px",
        align: "left"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    const { data } = params;
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-text"
    }, data.data.value.content);
  }
});
const Image$1 = createBlock({
  name: "Image",
  type: BasicType.IMAGE,
  create: (payload) => {
    const defaultData = {
      type: BasicType.IMAGE,
      data: {
        value: {}
      },
      attributes: {
        align: "center",
        height: "auto",
        padding: "10px 25px 10px 25px",
        src: ""
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-image"
    });
  }
});
const Group$1 = createBlock({
  name: "Group",
  type: BasicType.GROUP,
  create: (payload) => {
    const defaultData = {
      type: BasicType.GROUP,
      data: {
        value: {}
      },
      attributes: {
        "vertical-align": "top",
        direction: "ltr"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.SECTION],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-group"
    });
  }
});
const Button$1 = createBlock({
  name: "Button",
  type: BasicType.BUTTON,
  create: (payload) => {
    const defaultData = {
      type: BasicType.BUTTON,
      data: {
        value: {
          content: "Button"
        }
      },
      attributes: {
        align: "center",
        "background-color": "#414141",
        color: "#ffffff",
        "font-weight": "normal",
        "border-radius": "3px",
        padding: "10px 25px 10px 25px",
        "inner-padding": "10px 25px 10px 25px",
        "line-height": "120%",
        target: "_blank",
        "vertical-align": "middle",
        border: "none",
        "text-align": "center",
        href: "#"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    const { data } = params;
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-button"
    }, data.data.value.content);
  }
});
const Divider$1 = createBlock({
  name: "Divider",
  type: BasicType.DIVIDER,
  create: (payload) => {
    const defaultData = {
      type: BasicType.DIVIDER,
      data: {
        value: {}
      },
      attributes: {
        align: "center",
        "border-width": "1px",
        "border-style": "solid",
        "border-color": "#C9CCCF",
        padding: "10px 0px 10px 0px"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-divider"
    });
  }
});
const Spacer$1 = createBlock({
  name: "Spacer",
  type: BasicType.SPACER,
  create: (payload) => {
    const defaultData = {
      type: BasicType.SPACER,
      data: {
        value: {}
      },
      attributes: {
        height: "20px"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-spacer"
    });
  }
});
function mergeBlock(a, b) {
  return mergeWith(a, b, (a2, b2) => isArray$4(b2) ? b2 : void 0);
}
const Carousel$1 = createBlock({
  name: "Carousel",
  type: BasicType.CAROUSEL,
  create: (payload) => {
    const defaultData = {
      type: BasicType.CAROUSEL,
      data: {
        value: {
          images: [
            {
              src: getImg("IMAGE_15"),
              target: "_blank"
            },
            {
              src: getImg("IMAGE_16"),
              target: "_blank"
            },
            {
              src: getImg("IMAGE_17"),
              target: "_blank"
            }
          ]
        }
      },
      attributes: {
        align: "center",
        "left-icon": "https://i.imgur.com/xTh3hln.png",
        "right-icon": "https://i.imgur.com/os7o9kz.png",
        "icon-width": "44px",
        thumbnails: "visible"
      },
      children: []
    };
    return mergeBlock(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
  render(params) {
    const { data } = params;
    const carouselImages = data.data.value.images.map((image) => {
      const imageAttributeStr = Object.keys(image).filter((key) => key !== "content" && image[key] !== "").map((key) => `${key}="${image[key]}"`).join(" ");
      return `
      <mj-carousel-image ${imageAttributeStr} />
      `;
    }).join("\n");
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-carousel"
    }, carouselImages);
  }
});
const Hero$1 = createBlock({
  name: "Hero",
  type: BasicType.HERO,
  create: (payload) => {
    const defaultData = {
      type: BasicType.HERO,
      data: {
        value: {}
      },
      attributes: {
        "background-color": "#ffffff",
        "background-position": "center center",
        mode: "fluid-height",
        padding: "100px 0px 100px 0px",
        "vertical-align": "top",
        "background-url": getImg("IMAGE_31")
      },
      children: [
        {
          type: "text",
          data: {
            value: {
              content: "We Serve Healthy &amp; Delicious Foods"
            }
          },
          attributes: {
            padding: "10px 25px 10px 25px",
            align: "center",
            color: "#ffffff",
            "font-size": "45px",
            "line-height": "45px"
          },
          children: []
        },
        {
          type: "text",
          data: {
            value: {
              content: "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.<br>"
            }
          },
          attributes: {
            align: "center",
            "background-color": "#414141",
            color: "#ffffff",
            "font-weight": "normal",
            "border-radius": "3px",
            padding: "10px 25px 10px 25px",
            "inner-padding": "10px 25px 10px 25px",
            "line-height": "1.5",
            target: "_blank",
            "vertical-align": "middle",
            border: "none",
            "text-align": "center",
            href: "#",
            "font-size": "14px"
          },
          children: []
        },
        {
          type: "button",
          data: {
            value: {
              content: "Get Your Order Here!"
            }
          },
          attributes: {
            align: "center",
            "background-color": "#f3a333",
            color: "#ffffff",
            "font-size": "13px",
            "font-weight": "normal",
            "border-radius": "30px",
            padding: "10px 25px 10px 25px",
            "inner-padding": "10px 25px 10px 25px",
            "line-height": "120%",
            target: "_blank",
            "vertical-align": "middle",
            border: "none",
            "text-align": "center",
            href: "#"
          },
          children: []
        }
      ]
    };
    return mergeBlock(defaultData, payload);
  },
  validParentType: [BasicType.PAGE, BasicType.WRAPPER],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-hero"
    });
  }
});
const Navbar$1 = createBlock({
  name: "Navbar",
  type: BasicType.NAVBAR,
  create: (payload) => {
    const defaultData = {
      type: BasicType.NAVBAR,
      data: {
        value: {
          links: [
            {
              href: "/gettings-started-onboard",
              content: "Getting started",
              color: "#1890ff",
              "font-size": "13px",
              target: "_blank",
              padding: "15px 10px"
            },
            {
              href: "/try-it-live",
              content: "Try it live",
              color: "#1890ff",
              "font-size": "13px",
              target: "_blank",
              padding: "15px 10px"
            },
            {
              href: "/templates",
              content: "Templates",
              color: "#1890ff",
              "font-size": "13px",
              target: "_blank",
              padding: "15px 10px"
            },
            {
              href: "/components",
              content: "Components",
              color: "#1890ff",
              "font-size": "13px",
              target: "_blank",
              padding: "15px 10px"
            }
          ]
        }
      },
      attributes: {
        align: "center"
      },
      children: []
    };
    return mergeBlock(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    const { data } = params;
    const links = data.data.value.links.map((link, index2) => {
      const linkAttributeStr = Object.keys(link).filter((key) => key !== "content" && link[key] !== "").map((key) => `${key}="${link[key]}"`).join(" ");
      return `
          <mj-navbar-link ${linkAttributeStr}>${link.content}</mj-navbar-link>
          `;
    }).join("\n");
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-navbar"
    }, links);
  }
});
const Social$1 = createBlock({
  name: "Social",
  type: BasicType.SOCIAL,
  create: (payload) => {
    const defaultData = {
      type: BasicType.SOCIAL,
      data: {
        value: {
          elements: [
            {
              href: "#",
              target: "_blank",
              src: getImg("IMAGE_02"),
              content: "Facebook"
            },
            {
              href: "#",
              target: "_blank",
              src: getImg("IMAGE_03"),
              content: "Google"
            },
            {
              href: "",
              target: "_blank",
              src: getImg("IMAGE_04"),
              content: "Twitter"
            }
          ]
        }
      },
      attributes: {
        align: "center",
        color: "#333333",
        mode: "horizontal",
        "font-size": "13px",
        "font-weight": "normal",
        "border-radius": "3px",
        padding: "10px 25px 10px 25px",
        "inner-padding": "4px 4px 4px 4px",
        "line-height": "22px",
        "text-padding": "4px 4px 4px 0px",
        "icon-padding": "0px",
        "icon-size": "20px"
      },
      children: []
    };
    return mergeBlock(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
  render(params) {
    const { data } = params;
    const elements = data.data.value.elements.map((element) => {
      const elementAttributeStr = Object.keys(element).filter((key) => key !== "content" && element[key] !== "").map((key) => `${key}="${element[key]}"`).join(" ");
      return `
          <mj-social-element ${elementAttributeStr}>${element.content}</mj-social-element>
          `;
    }).join("\n");
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-social"
    }, elements);
  }
});
const Raw$1 = createBlock({
  name: "Raw",
  type: BasicType.RAW,
  create: (payload) => {
    const defaultData = {
      type: BasicType.RAW,
      data: {
        value: {
          content: "<% if (user) { %>"
        }
      },
      attributes: {},
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [
    BasicType.PAGE,
    BasicType.WRAPPER,
    BasicType.SECTION,
    BasicType.GROUP,
    BasicType.COLUMN,
    BasicType.HERO
  ],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-raw"
    }, params.data.data.value.content);
  }
});
const Template$1 = createBlock({
  name: "Template",
  type: BasicType.TEMPLATE,
  create: (payload) => {
    const defaultData = {
      type: BasicType.TEMPLATE,
      data: {
        value: {
          idx: ""
        }
      },
      attributes: {},
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [],
  render(params) {
    const { data } = params;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, `
          ${data.children.map((child) => React.createElement(BlockRenderer, __spreadProps(__spreadValues({}, params), {
      data: child
    })))}
        `);
  }
});
const AccordionElement$1 = createBlock({
  name: "Accordion element",
  type: BasicType.ACCORDION_ELEMENT,
  create: (payload) => {
    const defaultData = {
      type: BasicType.ACCORDION_ELEMENT,
      data: {
        value: {}
      },
      attributes: {
        "icon-align": "middle",
        "icon-height": "32px",
        "icon-width": "32px",
        "icon-position": "right"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.ACCORDION],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-accordion-element"
    });
  }
});
const AccordionTitle$1 = createBlock({
  name: "Accordion title",
  type: BasicType.ACCORDION_TITLE,
  create: (payload) => {
    const defaultData = {
      type: BasicType.ACCORDION_TITLE,
      data: {
        value: {
          content: "Why use an accordion?"
        }
      },
      attributes: {
        "font-size": "13px",
        padding: "16px 16px 16px 16px"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.ACCORDION],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-accordion-title"
    }, params.data.data.value.content);
  }
});
const AccordionText$1 = createBlock({
  name: "Accordion text",
  type: BasicType.ACCORDION_TEXT,
  create: (payload) => {
    const defaultData = {
      type: BasicType.ACCORDION_TEXT,
      data: {
        value: {
          content: "Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way"
        }
      },
      attributes: {
        "font-size": "13px",
        padding: "16px 16px 16px 16px",
        "line-height": "1"
      },
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.ACCORDION],
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-accordion-text"
    }, params.data.data.value.content);
  }
});
const Accordion$1 = createBlock({
  name: "Accordion",
  type: BasicType.ACCORDION,
  validParentType: [BasicType.COLUMN],
  create: (payload) => {
    const defaultData = {
      type: BasicType.ACCORDION,
      data: {
        value: {}
      },
      attributes: {
        "icon-height": "32px",
        "icon-width": "32px",
        "icon-align": "middle",
        "icon-position": "right",
        "icon-unwrapped-url": getImg("IMAGE_09"),
        "icon-wrapped-url": getImg("IMAGE_10"),
        padding: "10px 25px 10px 25px",
        border: "1px solid #d9d9d9"
      },
      children: [
        AccordionElement$1.create({
          children: [
            AccordionTitle$1.create({
              data: {
                value: {
                  content: "Why use an accordion?"
                }
              }
            }),
            AccordionText$1.create({
              data: {
                value: {
                  content: "Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way."
                }
              }
            })
          ]
        }),
        AccordionElement$1.create({
          children: [
            AccordionTitle$1.create({
              data: {
                value: {
                  content: "How it works"
                }
              }
            }),
            AccordionText$1.create({
              data: {
                value: {
                  content: "Content is stacked into tabs and users can expand them at will. If responsive styles are not supported (mostly on desktop clients), tabs are then expanded and your content is readable at once."
                }
              }
            })
          ]
        })
      ]
    };
    return mergeBlock(defaultData, payload);
  },
  render(params) {
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-accordion"
    });
  }
});
const Table$1 = createBlock({
  name: "Table",
  type: BasicType.TABLE,
  create: (payload) => {
    const defaultData = {
      type: BasicType.TABLE,
      data: {
        value: {
          content: ""
        }
      },
      attributes: {},
      children: []
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
  render(params) {
    const { data } = params;
    return /* @__PURE__ */ React.createElement(BasicBlock, {
      params,
      tag: "mj-table"
    }, data.data.value.content);
  }
});
const standardBlocks = {
  [BasicType.PAGE]: Page$1,
  [BasicType.SECTION]: Section$1,
  [BasicType.COLUMN]: Column$1,
  [BasicType.TEXT]: Text$1,
  [BasicType.IMAGE]: Image$1,
  [BasicType.GROUP]: Group$1,
  [BasicType.BUTTON]: Button$1,
  [BasicType.DIVIDER]: Divider$1,
  [BasicType.WRAPPER]: Wrapper$1,
  [BasicType.SPACER]: Spacer$1,
  [BasicType.RAW]: Raw$1,
  [BasicType.CAROUSEL]: Carousel$1,
  [BasicType.HERO]: Hero$1,
  [BasicType.NAVBAR]: Navbar$1,
  [BasicType.SOCIAL]: Social$1,
  [BasicType.TEMPLATE]: Template$1,
  [BasicType.ACCORDION]: Accordion$1,
  [BasicType.ACCORDION_ELEMENT]: AccordionElement$1,
  [BasicType.ACCORDION_TITLE]: AccordionTitle$1,
  [BasicType.ACCORDION_TEXT]: AccordionText$1,
  [BasicType.TABLE]: Table$1
};
const createCustomBlock = createBlock;
function generateAdvancedBlock(option) {
  const baseBlock = Object.values(standardBlocks).find((b) => b.type === option.baseType);
  if (!baseBlock) {
    throw new Error(`Can not find ${option.baseType}`);
  }
  return createCustomBlock({
    name: baseBlock.name,
    type: option.type,
    validParentType: option.validParentType,
    create: (payload) => {
      const defaultData = __spreadProps(__spreadValues({}, baseBlock.create()), {
        type: option.type
      });
      return merge(defaultData, payload);
    },
    render: (params) => {
      const { data, idx, mode, context, dataSource } = params;
      const { iteration, condition, i18n } = data.data.value;
      const getBaseContent = (bIdx, index2) => option.getContent({
        index: index2,
        data,
        idx: bIdx,
        mode,
        context,
        dataSource,
        i18n
      });
      let children = getBaseContent(idx, 0);
      if (mode === "testing") {
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(React.Fragment, {
          key: "children"
        }, children), new Array(((iteration == null ? void 0 : iteration.mockQuantity) || 1) - 1).fill(true).map((_, index2) => /* @__PURE__ */ React.createElement(React.Fragment, {
          key: index2
        }, getBaseContent(idx, index2 + 1))));
      }
      if (condition && condition.enabled) {
        children = TemplateEngineManager.generateTagTemplate("condition")(condition, children);
      }
      if (iteration && iteration.enabled) {
        children = TemplateEngineManager.generateTagTemplate("iteration")(iteration, children);
      }
      return children;
    }
  });
}
var I18nType;
(function(I18nType2) {
  I18nType2["I18N"] = "i18n";
  I18nType2["CI18N"] = "ci18n";
  I18nType2["NI18N"] = "ni18n";
  I18nType2["CNI18N"] = "cni18n";
})(I18nType || (I18nType = {}));
var Operator;
(function(Operator2) {
  Operator2["TRUTHY"] = "truthy";
  Operator2["FALSY"] = "falsy";
  Operator2["EQUAL"] = "==";
  Operator2["NOT_EQUAL"] = "!=";
  Operator2["GREATER"] = ">";
  Operator2["GREATER_OR_EQUAL"] = ">=";
  Operator2["LESS"] = "<";
  Operator2["LESS_OR_EQUAL"] = "<=";
})(Operator || (Operator = {}));
var OperatorSymbol;
(function(OperatorSymbol2) {
  OperatorSymbol2["AND"] = "and";
  OperatorSymbol2["OR"] = "or";
})(OperatorSymbol || (OperatorSymbol = {}));
function MjmlBlock({
  idx,
  value,
  type,
  attributes,
  children
}) {
  const { mode } = useEmailRenderContext();
  const block = BlockManager.getBlockByType(type);
  if (!block) {
    throw new Error(`Can no find ${type}`);
  }
  const mergeValue = useMemo(() => {
    if (typeof children === "string") {
      if (!value) {
        return {
          content: children
        };
      } else {
        set(value, "content", children);
        return value;
      }
    }
    return value;
  }, [children, value]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, block.render({
    idx,
    mode,
    data: {
      type: block.type,
      data: {
        value: mergeValue
      },
      attributes,
      children: []
    },
    children
  }));
}
function Page(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.PAGE
  }, props.children);
}
function Section(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.SECTION
  }, props.children);
}
function Column(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.COLUMN
  }, props.children);
}
function Text(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.TEXT
  }, props.children);
}
function Image(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.IMAGE
  }, props.children);
}
function Group(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.GROUP
  }, props.children);
}
function Button(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.BUTTON
  }, props.children);
}
function Divider(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.DIVIDER
  }, props.children);
}
function Wrapper(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.WRAPPER
  }, props.children);
}
function Spacer(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.SPACER
  }, props.children);
}
function Raw(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.RAW
  }, props.children);
}
function Accordion(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.ACCORDION
  }, props.children);
}
function AccordionElement(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.ACCORDION_ELEMENT
  }, props.children);
}
function AccordionTitle(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.ACCORDION_TITLE
  }, props.children);
}
function AccordionText(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.ACCORDION_TEXT
  }, props.children);
}
function Carousel(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.CAROUSEL
  }, props.children);
}
function Hero(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.HERO
  }, props.children);
}
function Navbar(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.NAVBAR
  }, props.children);
}
function Social(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.SOCIAL
  }, props.children);
}
function Table(props) {
  return /* @__PURE__ */ React.createElement(MjmlBlock, {
    attributes: omit(props, ["data", "children", "value"]),
    value: props.value,
    type: BasicType.TABLE
  }, props.children);
}
function Template(props) {
  return props.children;
}
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Page,
  Section,
  Column,
  Text,
  Image,
  Group,
  Button,
  Divider,
  Wrapper,
  Spacer,
  Raw,
  Accordion,
  AccordionElement,
  AccordionTitle,
  AccordionText,
  Carousel,
  Hero,
  Navbar,
  Social,
  Table,
  Template,
  MjmlBlock
});
function classnames(...rest) {
  return rest.filter((item) => typeof item === "string").join(" ");
}
function ancestorOf(type, targetType) {
  let level = -1;
  const paths = BlockManager.getAutoCompletePath(type, targetType);
  if (paths) {
    return paths.length + 1;
  }
  return level;
}
function getPageIdx() {
  return "content";
}
function getChildIdx(idx, index2) {
  return `${idx}.children.[${index2}]`;
}
function getNodeIdxClassName(idx) {
  return `node-idx-${idx}`;
}
function getNodeTypeClassName(type) {
  return `node-type-${type}`;
}
function getNodeIdxFromClassName(classList) {
  var _a;
  return (_a = Array.from(classList).find((item) => item.includes("node-idx-"))) == null ? void 0 : _a.replace("node-idx-", "");
}
function getNodeTypeFromClassName(classList) {
  var _a;
  return (_a = Array.from(isString(classList) ? classList.split(" ") : classList).find((item) => item.includes("node-type-"))) == null ? void 0 : _a.replace("node-type-", "");
}
const getIndexByIdx = (idx) => {
  var _a;
  return Number((_a = /\.\[(\d+)\]$/.exec(idx)) == null ? void 0 : _a[1]) || 0;
};
const getParentIdx = (idx) => {
  var _a;
  if (idx === getPageIdx())
    return void 0;
  return (_a = /(.*)\.children\.\[\d+\]$/.exec(idx)) == null ? void 0 : _a[1];
};
const getValueByIdx = (values, idx) => {
  return get(values, idx);
};
const getParentByIdx = (values, idx) => {
  return get(values, getParentIdx(idx) || "");
};
const getSiblingIdx = (sourceIndex, num) => {
  return sourceIndex.replace(/\[(\d+)\]$/, (_, index2) => {
    if (Number(index2) + num < 0)
      return "[0]";
    return `[${Number(index2) + num}]`;
  });
};
const getParentByType = (context, idx, type) => {
  if (!idx)
    return null;
  let parentIdx = getParentIdx(idx);
  while (parentIdx) {
    const parent = get(context, parentIdx);
    if (parent && parent.type === type)
      return parent;
    parentIdx = getParentIdx(idx);
  }
  return null;
};
const getSameParent = (values, idx, dragType) => {
  let parentIdx = idx;
  const block = BlockManager.getBlockByType(dragType);
  if (!block)
    return null;
  while (parentIdx) {
    const parent = get(values, parentIdx);
    if (ancestorOf(block.type, parent.type) > 0) {
      return {
        parent,
        parentIdx
      };
    }
    parentIdx = getParentIdx(parentIdx);
  }
  return null;
};
const getParenRelativeByType = (context, idx, type) => {
  let prevIdx = "";
  let parentIdx = idx;
  while (parentIdx) {
    const parent = get(context, parentIdx);
    if (parent && parent.type === type) {
      return {
        insertIndex: prevIdx ? getIndexByIdx(prevIdx) : parent.children.length - 1,
        parentIdx,
        parent
      };
    } else {
      prevIdx = parentIdx;
      parentIdx = getParentIdx(parentIdx);
    }
  }
  return null;
};
const getValidChildBlocks = (type) => {
  return BlockManager.getBlocks().filter((item) => item.validParentType.includes(type));
};
function getPreviewClassName(idx, type) {
  return classnames("email-block", idx && getNodeIdxClassName(idx), getNodeTypeClassName(type));
}
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$1;
function eq$2(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$2;
var eq$1 = eq_1;
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$4;
var assocIndexOf$3 = _assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete$1(key) {
  var data = this.__data__, index2 = assocIndexOf$3(data, key);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index2 == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index2, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$1;
var assocIndexOf$2 = _assocIndexOf;
function listCacheGet$1(key) {
  var data = this.__data__, index2 = assocIndexOf$2(data, key);
  return index2 < 0 ? void 0 : data[index2][1];
}
var _listCacheGet = listCacheGet$1;
var assocIndexOf$1 = _assocIndexOf;
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$1;
var assocIndexOf = _assocIndexOf;
function listCacheSet$1(key, value) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index2][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$1;
var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
function ListCache$4(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype["delete"] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;
var _ListCache = ListCache$4;
var ListCache$3 = _ListCache;
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}
var _stackClear = stackClear$1;
function stackDelete$1(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete$1;
function stackGet$1(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$1;
function stackHas$1(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$1;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$8 = freeGlobal || freeSelf || Function("return this")();
var _root = root$8;
var root$7 = _root;
var Symbol$4 = root$7.Symbol;
var _Symbol = Symbol$4;
var Symbol$3 = _Symbol;
var objectProto$c = Object.prototype;
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
var nativeObjectToString$1 = objectProto$c.toString;
var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag$1;
var objectProto$b = Object.prototype;
var nativeObjectToString = objectProto$b.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$2 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag$4(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$4;
function isObject$5(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$5;
var baseGetTag$3 = _baseGetTag, isObject$4 = isObject_1;
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$2(value) {
  if (!isObject$4(value)) {
    return false;
  }
  var tag = baseGetTag$3(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction$2;
var root$6 = _root;
var coreJsData$1 = root$6["__core-js_shared__"];
var _coreJsData = coreJsData$1;
var coreJsData = _coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked$1;
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var _toSource = toSource$2;
var isFunction$1 = isFunction_1, isMasked = _isMasked, isObject$3 = isObject_1, toSource$1 = _toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$a = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty$8).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative$1(value) {
  if (!isObject$3(value) || isMasked(value)) {
    return false;
  }
  var pattern2 = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern2.test(toSource$1(value));
}
var _baseIsNative = baseIsNative$1;
function getValue$1(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue = getValue$1;
var baseIsNative = _baseIsNative, getValue = _getValue;
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var _getNative = getNative$7;
var getNative$6 = _getNative, root$5 = _root;
var Map$3 = getNative$6(root$5, "Map");
var _Map = Map$3;
var getNative$5 = _getNative;
var nativeCreate$4 = getNative$5(Object, "create");
var _nativeCreate = nativeCreate$4;
var nativeCreate$3 = _nativeCreate;
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$1;
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$1;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$7.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$1;
var nativeCreate$1 = _nativeCreate;
var objectProto$8 = Object.prototype;
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$6.call(data, key);
}
var _hashHas = hashHas$1;
var nativeCreate = _nativeCreate;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
var _hashSet = hashSet$1;
var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
function Hash$1(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
Hash$1.prototype.clear = hashClear;
Hash$1.prototype["delete"] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;
var _Hash = Hash$1;
var Hash = _Hash, ListCache$2 = _ListCache, Map$2 = _Map;
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache$2)(),
    "string": new Hash()
  };
}
var _mapCacheClear = mapCacheClear$1;
function isKeyable$1(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$1;
var isKeyable = _isKeyable;
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$4;
var getMapData$3 = _getMapData;
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$1;
var getMapData$2 = _getMapData;
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$1;
var getMapData$1 = _getMapData;
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$1;
var getMapData = _getMapData;
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$1;
var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
function MapCache$1(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype["delete"] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;
var _MapCache = MapCache$1;
var ListCache$1 = _ListCache, Map$1 = _Map, MapCache = _MapCache;
var LARGE_ARRAY_SIZE = 200;
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$1;
var ListCache = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
function Stack$1(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack$1.prototype.clear = stackClear;
Stack$1.prototype["delete"] = stackDelete;
Stack$1.prototype.get = stackGet;
Stack$1.prototype.has = stackHas;
Stack$1.prototype.set = stackSet;
var _Stack = Stack$1;
function arrayEach$1(array, iteratee) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (iteratee(array[index2], index2, array) === false) {
      break;
    }
  }
  return array;
}
var _arrayEach = arrayEach$1;
var getNative$4 = _getNative;
var defineProperty$1 = function() {
  try {
    var func = getNative$4(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var _defineProperty = defineProperty$1;
var defineProperty = _defineProperty;
function baseAssignValue$2(object, key, value) {
  if (key == "__proto__" && defineProperty) {
    defineProperty(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$2;
var baseAssignValue$1 = _baseAssignValue, eq = eq_1;
var objectProto$7 = Object.prototype;
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
function assignValue$2(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$5.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue$1(object, key, value);
  }
}
var _assignValue = assignValue$2;
var assignValue$1 = _assignValue, baseAssignValue = _baseAssignValue;
function copyObject$4(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index2 = -1, length = props.length;
  while (++index2 < length) {
    var key = props[index2];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue$1(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject$4;
function baseTimes$1(n, iteratee) {
  var index2 = -1, result = Array(n);
  while (++index2 < n) {
    result[index2] = iteratee(index2);
  }
  return result;
}
var _baseTimes = baseTimes$1;
function isObjectLike$5(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$5;
var baseGetTag$2 = _baseGetTag, isObjectLike$4 = isObjectLike_1;
var argsTag$2 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$4(value) && baseGetTag$2(value) == argsTag$2;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments, isObjectLike$3 = isObjectLike_1;
var objectProto$6 = Object.prototype;
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;
var isArguments$1 = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike$3(value) && hasOwnProperty$4.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments_1 = isArguments$1;
var isArray$3 = Array.isArray;
var isArray_1 = isArray$3;
var isBuffer$2 = { exports: {} };
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
(function(module, exports) {
  var root2 = _root, stubFalse2 = stubFalse_1;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root2.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer2 = nativeIsBuffer || stubFalse2;
  module.exports = isBuffer2;
})(isBuffer$2, isBuffer$2.exports);
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex$1(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex$1;
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength$2(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_1 = isLength$2;
var baseGetTag$1 = _baseGetTag, isLength$1 = isLength_1, isObjectLike$2 = isObjectLike_1;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike$2(value) && isLength$1(value.length) && !!typedArrayTags[baseGetTag$1(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;
function baseUnary$3(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$3;
var _nodeUtil = { exports: {} };
(function(module, exports) {
  var freeGlobal2 = _freeGlobal;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  module.exports = nodeUtil2;
})(_nodeUtil, _nodeUtil.exports);
var baseIsTypedArray = _baseIsTypedArray, baseUnary$2 = _baseUnary, nodeUtil$2 = _nodeUtil.exports;
var nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;
var isTypedArray$1 = nodeIsTypedArray ? baseUnary$2(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$1;
var baseTimes = _baseTimes, isArguments = isArguments_1, isArray$2 = isArray_1, isBuffer$1 = isBuffer$2.exports, isIndex = _isIndex, isTypedArray = isTypedArray_1;
var objectProto$5 = Object.prototype;
var hasOwnProperty$3 = objectProto$5.hasOwnProperty;
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$2(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$3.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$2;
var objectProto$4 = Object.prototype;
function isPrototype$3(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$4;
  return value === proto;
}
var _isPrototype = isPrototype$3;
function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$2;
var overArg$1 = _overArg;
var nativeKeys$1 = overArg$1(Object.keys, Object);
var _nativeKeys = nativeKeys$1;
var isPrototype$2 = _isPrototype, nativeKeys = _nativeKeys;
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function baseKeys$1(object) {
  if (!isPrototype$2(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$2.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys$1;
var isFunction = isFunction_1, isLength = isLength_1;
function isArrayLike$2(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
var isArrayLike_1 = isArrayLike$2;
var arrayLikeKeys$1 = _arrayLikeKeys, baseKeys = _baseKeys, isArrayLike$1 = isArrayLike_1;
function keys$3(object) {
  return isArrayLike$1(object) ? arrayLikeKeys$1(object) : baseKeys(object);
}
var keys_1 = keys$3;
var copyObject$3 = _copyObject, keys$2 = keys_1;
function baseAssign$1(object, source) {
  return object && copyObject$3(source, keys$2(source), object);
}
var _baseAssign = baseAssign$1;
function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn$1;
var isObject$2 = isObject_1, isPrototype$1 = _isPrototype, nativeKeysIn = _nativeKeysIn;
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
function baseKeysIn$1(object) {
  if (!isObject$2(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$1(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$1.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn$1;
var arrayLikeKeys = _arrayLikeKeys, baseKeysIn = _baseKeysIn, isArrayLike = isArrayLike_1;
function keysIn$3(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var keysIn_1 = keysIn$3;
var copyObject$2 = _copyObject, keysIn$2 = keysIn_1;
function baseAssignIn$1(object, source) {
  return object && copyObject$2(source, keysIn$2(source), object);
}
var _baseAssignIn = baseAssignIn$1;
var _cloneBuffer = { exports: {} };
(function(module, exports) {
  var root2 = _root;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root2.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module.exports = cloneBuffer2;
})(_cloneBuffer, _cloneBuffer.exports);
function copyArray$1(source, array) {
  var index2 = -1, length = source.length;
  array || (array = Array(length));
  while (++index2 < length) {
    array[index2] = source[index2];
  }
  return array;
}
var _copyArray = copyArray$1;
function arrayFilter$1(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index2 < length) {
    var value = array[index2];
    if (predicate(value, index2, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter$1;
function stubArray$2() {
  return [];
}
var stubArray_1 = stubArray$2;
var arrayFilter = _arrayFilter, stubArray$1 = stubArray_1;
var objectProto$1 = Object.prototype;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var _getSymbols = getSymbols$3;
var copyObject$1 = _copyObject, getSymbols$2 = _getSymbols;
function copySymbols$1(source, object) {
  return copyObject$1(source, getSymbols$2(source), object);
}
var _copySymbols = copySymbols$1;
function arrayPush$2(array, values) {
  var index2 = -1, length = values.length, offset = array.length;
  while (++index2 < length) {
    array[offset + index2] = values[index2];
  }
  return array;
}
var _arrayPush = arrayPush$2;
var overArg = _overArg;
var getPrototype$2 = overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$2;
var arrayPush$1 = _arrayPush, getPrototype$1 = _getPrototype, getSymbols$1 = _getSymbols, stubArray = stubArray_1;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush$1(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
var _getSymbolsIn = getSymbolsIn$2;
var copyObject = _copyObject, getSymbolsIn$1 = _getSymbolsIn;
function copySymbolsIn$1(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
var _copySymbolsIn = copySymbolsIn$1;
var arrayPush = _arrayPush, isArray$1 = isArray_1;
function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
var _baseGetAllKeys = baseGetAllKeys$2;
var baseGetAllKeys$1 = _baseGetAllKeys, getSymbols = _getSymbols, keys$1 = keys_1;
function getAllKeys$1(object) {
  return baseGetAllKeys$1(object, keys$1, getSymbols);
}
var _getAllKeys = getAllKeys$1;
var baseGetAllKeys = _baseGetAllKeys, getSymbolsIn = _getSymbolsIn, keysIn$1 = keysIn_1;
function getAllKeysIn$1(object) {
  return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
}
var _getAllKeysIn = getAllKeysIn$1;
var getNative$3 = _getNative, root$4 = _root;
var DataView$1 = getNative$3(root$4, "DataView");
var _DataView = DataView$1;
var getNative$2 = _getNative, root$3 = _root;
var Promise$2 = getNative$2(root$3, "Promise");
var _Promise = Promise$2;
var getNative$1 = _getNative, root$2 = _root;
var Set$2 = getNative$1(root$2, "Set");
var _Set = Set$2;
var getNative = _getNative, root$1 = _root;
var WeakMap$1 = getNative(root$1, "WeakMap");
var _WeakMap = WeakMap$1;
var DataView = _DataView, Map = _Map, Promise$1 = _Promise, Set$1 = _Set, WeakMap = _WeakMap, baseGetTag = _baseGetTag, toSource = _toSource;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap);
var getTag$3 = baseGetTag;
if (DataView && getTag$3(new DataView(new ArrayBuffer(1))) != dataViewTag$2 || Map && getTag$3(new Map()) != mapTag$3 || Promise$1 && getTag$3(Promise$1.resolve()) != promiseTag || Set$1 && getTag$3(new Set$1()) != setTag$3 || WeakMap && getTag$3(new WeakMap()) != weakMapTag$1) {
  getTag$3 = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var _getTag = getTag$3;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray$1(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var _initCloneArray = initCloneArray$1;
var root = _root;
var Uint8Array$2 = root.Uint8Array;
var _Uint8Array = Uint8Array$2;
var Uint8Array$1 = _Uint8Array;
function cloneArrayBuffer$3(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer$3;
var cloneArrayBuffer$2 = _cloneArrayBuffer;
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView = cloneDataView$1;
var reFlags = /\w*$/;
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var _cloneRegExp = cloneRegExp$1;
var Symbol$1 = _Symbol;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol$1(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var _cloneSymbol = cloneSymbol$1;
var cloneArrayBuffer$1 = _cloneArrayBuffer;
function cloneTypedArray$1(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray$1;
var cloneArrayBuffer = _cloneArrayBuffer, cloneDataView = _cloneDataView, cloneRegExp = _cloneRegExp, cloneSymbol = _cloneSymbol, cloneTypedArray = _cloneTypedArray;
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag$1(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$1:
      return cloneSymbol(object);
  }
}
var _initCloneByTag = initCloneByTag$1;
var isObject$1 = isObject_1;
var objectCreate = Object.create;
var baseCreate$1 = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var _baseCreate = baseCreate$1;
var baseCreate = _baseCreate, getPrototype = _getPrototype, isPrototype = _isPrototype;
function initCloneObject$1(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
var _initCloneObject = initCloneObject$1;
var getTag$2 = _getTag, isObjectLike$1 = isObjectLike_1;
var mapTag$1 = "[object Map]";
function baseIsMap$1(value) {
  return isObjectLike$1(value) && getTag$2(value) == mapTag$1;
}
var _baseIsMap = baseIsMap$1;
var baseIsMap = _baseIsMap, baseUnary$1 = _baseUnary, nodeUtil$1 = _nodeUtil.exports;
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap$1 = nodeIsMap ? baseUnary$1(nodeIsMap) : baseIsMap;
var isMap_1 = isMap$1;
var getTag$1 = _getTag, isObjectLike = isObjectLike_1;
var setTag$1 = "[object Set]";
function baseIsSet$1(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}
var _baseIsSet = baseIsSet$1;
var baseIsSet = _baseIsSet, baseUnary = _baseUnary, nodeUtil = _nodeUtil.exports;
var nodeIsSet = nodeUtil && nodeUtil.isSet;
var isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
var isSet_1 = isSet$1;
var Stack = _Stack, arrayEach = _arrayEach, assignValue = _assignValue, baseAssign = _baseAssign, baseAssignIn = _baseAssignIn, cloneBuffer = _cloneBuffer.exports, copyArray = _copyArray, copySymbols = _copySymbols, copySymbolsIn = _copySymbolsIn, getAllKeys = _getAllKeys, getAllKeysIn = _getAllKeysIn, getTag = _getTag, initCloneArray = _initCloneArray, initCloneByTag = _initCloneByTag, initCloneObject = _initCloneObject, isArray = isArray_1, isBuffer = isBuffer$2.exports, isMap = isMap_1, isObject = isObject_1, isSet = isSet_1, keys = keys_1, keysIn = keysIn_1;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone$1(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var _baseClone = baseClone$1;
var baseClone = _baseClone;
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
var cloneDeep_1 = cloneDeep;
function generateAdvancedContentBlock(option) {
  return generateAdvancedBlock(__spreadProps(__spreadValues({}, option), {
    validParentType: [
      BasicType.PAGE,
      BasicType.WRAPPER,
      BasicType.COLUMN,
      BasicType.GROUP,
      BasicType.HERO,
      AdvancedType.WRAPPER,
      AdvancedType.COLUMN,
      AdvancedType.GROUP,
      AdvancedType.HERO
    ],
    getContent: (params) => {
      const { data, idx, mode, context, index: index2, i18n } = params;
      const previewClassName = mode === "testing" ? classnames(index2 === 0 && idx && getPreviewClassName(idx, data.type)) : "";
      const blockData = __spreadProps(__spreadValues({}, data), {
        type: option.baseType,
        attributes: __spreadProps(__spreadValues({}, data.attributes), {
          "css-class": classnames(data.attributes["css-class"], previewClassName)
        })
      });
      const block = BlockManager.getBlockByType(blockData.type);
      if (!block) {
        throw new Error(`Can not find ${blockData.type}`);
      }
      let children;
      if (mode === "testing" || !(i18n == null ? void 0 : i18n.enabled)) {
        children = block == null ? void 0 : block.render(__spreadProps(__spreadValues({}, params), { data: blockData, idx }));
      } else {
        const dataClone = cloneDeep_1(blockData);
        let content = blockData.data.value.content;
        const regexPattern = /{{({*[^{}]*}*)}}/g;
        const matches = content.matchAll(regexPattern);
        console.log("matches:", matches);
        let placeHolders = [];
        let counter = 1;
        for (const match of matches) {
          content = content.replace(match, "{%" + counter + "=" + match + "}");
          placeHolders.push(match);
        }
        let modifiedContent = `<mj-raw><!-- htmlmin:ignore -->`;
        if (i18n.type === I18nType.CI18N) {
          modifiedContent += `{{"${blockData.data.value.content}" | ci18n "${i18n.context}"`;
        } else if (i18n.type === I18nType.NI18N) {
          modifiedContent += `{{"${blockData.data.value.content}" | ni18n "${i18n.singularText}"`;
        } else if (i18n.type === I18nType.CNI18N) {
          modifiedContent += `"{{${blockData.data.value.content}" | cni18n "${i18n.context}" "${i18n.singularText}"`;
        } else {
          modifiedContent += `{{"${blockData.data.value.content}" | i18n `;
        }
        placeHolders.forEach((placeHolder) => {
          modifiedContent += " ";
          modifiedContent += placeHolder;
        });
        modifiedContent += `}}<!-- htmlmin:ignore --></mj-raw>`;
        modifiedContent += `ojbk`;
        children = block == null ? void 0 : block.render(__spreadProps(__spreadValues({}, params), { data: dataClone, idx }));
      }
      const parentBlockData = getParentByIdx({ content: context }, idx);
      if (!parentBlockData) {
        return children;
      }
      if (parentBlockData.type === BasicType.PAGE || parentBlockData.type === BasicType.WRAPPER || parentBlockData.type === AdvancedType.WRAPPER) {
        return /* @__PURE__ */ React.createElement(Section, {
          padding: "0px",
          "text-align": "left"
        }, /* @__PURE__ */ React.createElement(Column, null, children));
      }
      return children;
    }
  }));
}
function generateAdvancedLayoutBlock(option) {
  return generateAdvancedBlock(__spreadProps(__spreadValues({}, option), {
    getContent: (params) => {
      const { data, idx, mode, index: index2 } = params;
      const { iteration } = data.data.value;
      const blockData = __spreadProps(__spreadValues({}, data), {
        type: option.baseType
      });
      if (data.type === AdvancedType.COLUMN && (iteration == null ? void 0 : iteration.enabled)) {
        data.attributes.width = data.attributes.width || "100%";
      }
      const previewClassName = mode === "testing" ? classnames(index2 === 0 && idx && getPreviewClassName(idx, data.type)) : "";
      return /* @__PURE__ */ React.createElement(BlockRenderer, {
        idx: null,
        data: __spreadProps(__spreadValues({}, blockData), {
          attributes: __spreadProps(__spreadValues({}, blockData.attributes), {
            "css-class": classnames(data.attributes["css-class"], previewClassName)
          })
        })
      }, blockData.children.map((child, index22) => {
        return /* @__PURE__ */ React.createElement(BlockRenderer, __spreadProps(__spreadValues({
          key: index22
        }, params), {
          data: child,
          idx: idx ? getChildIdx(idx, index22) : null
        }));
      }));
    }
  }));
}
const AdvancedText = generateAdvancedContentBlock({
  type: AdvancedType.TEXT,
  baseType: BasicType.TEXT
});
const AdvancedButton = generateAdvancedContentBlock({
  type: AdvancedType.BUTTON,
  baseType: BasicType.BUTTON
});
const AdvancedImage = generateAdvancedContentBlock({
  type: AdvancedType.IMAGE,
  baseType: BasicType.IMAGE
});
const AdvancedDivider = generateAdvancedContentBlock({
  type: AdvancedType.DIVIDER,
  baseType: BasicType.DIVIDER
});
const AdvancedSpacer = generateAdvancedContentBlock({
  type: AdvancedType.SPACER,
  baseType: BasicType.SPACER
});
const AdvancedNavbar = generateAdvancedContentBlock({
  type: AdvancedType.NAVBAR,
  baseType: BasicType.NAVBAR
});
const AdvancedAccordion = generateAdvancedContentBlock({
  type: AdvancedType.ACCORDION,
  baseType: BasicType.ACCORDION
});
const AdvancedCarousel = generateAdvancedContentBlock({
  type: AdvancedType.CAROUSEL,
  baseType: BasicType.CAROUSEL
});
const AdvancedSocial = generateAdvancedContentBlock({
  type: AdvancedType.SOCIAL,
  baseType: BasicType.SOCIAL
});
const AdvancedWrapper = generateAdvancedLayoutBlock({
  type: AdvancedType.WRAPPER,
  baseType: BasicType.WRAPPER,
  validParentType: [BasicType.PAGE]
});
const AdvancedSection = generateAdvancedLayoutBlock({
  type: AdvancedType.SECTION,
  baseType: BasicType.SECTION,
  validParentType: [BasicType.PAGE, BasicType.WRAPPER, AdvancedType.WRAPPER]
});
const AdvancedGroup = generateAdvancedLayoutBlock({
  type: AdvancedType.GROUP,
  baseType: BasicType.GROUP,
  validParentType: [BasicType.SECTION, AdvancedType.SECTION]
});
const AdvancedColumn = generateAdvancedLayoutBlock({
  type: AdvancedType.COLUMN,
  baseType: BasicType.COLUMN,
  validParentType: [
    BasicType.SECTION,
    AdvancedType.SECTION,
    BasicType.GROUP,
    AdvancedType.GROUP
  ]
});
const AdvancedHero = generateAdvancedLayoutBlock({
  type: AdvancedType.HERO,
  baseType: BasicType.HERO,
  validParentType: [
    BasicType.WRAPPER,
    AdvancedType.WRAPPER,
    BasicType.PAGE
  ]
});
const advancedBlocks = {
  [AdvancedType.TEXT]: AdvancedText,
  [AdvancedType.BUTTON]: AdvancedButton,
  [AdvancedType.IMAGE]: AdvancedImage,
  [AdvancedType.DIVIDER]: AdvancedDivider,
  [AdvancedType.SPACER]: AdvancedSpacer,
  [AdvancedType.NAVBAR]: AdvancedNavbar,
  [AdvancedType.ACCORDION]: AdvancedAccordion,
  [AdvancedType.CAROUSEL]: AdvancedCarousel,
  [AdvancedType.SOCIAL]: AdvancedSocial,
  [AdvancedType.WRAPPER]: AdvancedWrapper,
  [AdvancedType.SECTION]: AdvancedSection,
  [AdvancedType.GROUP]: AdvancedGroup,
  [AdvancedType.COLUMN]: AdvancedColumn,
  [AdvancedType.HERO]: AdvancedHero
};
class BlockManager {
  static setAutoCompletePath() {
    const paths = {};
    const renderFullPath = (type, pathObj, prevPaths) => {
      const block = this.getBlockByType(type);
      if (!block) {
        throw new Error(`Can you register ${type} block`);
      }
      const currentPaths = [...prevPaths, type];
      if (block.validParentType.length === 0) {
        pathObj.push(currentPaths);
      }
      return block.validParentType.map((item) => {
        return renderFullPath(item, pathObj, currentPaths);
      });
    };
    Object.values(this.blocksMap).forEach((item) => {
      paths[item.type] = [];
      renderFullPath(item.type, paths[item.type], []);
    });
    return paths;
  }
  static getBlocks() {
    return Object.values(this.blocksMap);
  }
  static registerBlocks(blocksMap) {
    this.blocksMap = __spreadValues(__spreadValues({}, this.blocksMap), blocksMap);
    this.autoCompletePath = this.setAutoCompletePath();
  }
  static getBlockByType(type) {
    return this.blocksMap[type];
  }
  static getBlocksByType(types) {
    return types.map((item) => {
      const block = Object.values(this.blocksMap).find((child) => {
        return child.type === item;
      });
      return block;
    });
  }
  static getAutoCompleteFullPath() {
    if (Object.keys(this.autoCompletePath).length === 0) {
      this.autoCompletePath = this.setAutoCompletePath();
    }
    return this.autoCompletePath;
  }
  static getAutoCompletePath(type, targetType) {
    const block = this.getBlockByType(type);
    if (!block) {
      throw new Error(`Can you register ${type} block`);
    }
    if (block.validParentType.includes(targetType)) {
      return [];
    }
    const paths = this.getAutoCompleteFullPath()[type].find((item) => item.filter((_, index2) => index2 !== 0).includes(targetType));
    if (!paths)
      return null;
    const findIndex = paths.findIndex((item) => item === targetType);
    return paths.slice(1, findIndex);
  }
}
__publicField(BlockManager, "blocksMap", __spreadValues(__spreadValues({}, standardBlocks), advancedBlocks));
__publicField(BlockManager, "autoCompletePath", {});
function isValidBlockData(data) {
  try {
    if (data.attributes && data.children && data.data && data.type && BlockManager.getBlockByType(data.type)) {
      return true;
    }
  } catch (error) {
  }
  return false;
}
const domParser = new DOMParser();
function parseXMLtoBlock(text) {
  const dom = domParser.parseFromString(text, "text/xml");
  const root2 = dom.firstChild;
  if (!(dom.firstChild instanceof Element)) {
    throw new Error("Invalid content");
  }
  if (root2.tagName === "mjml") {
    const { json } = mjml(text, {
      validationLevel: "soft"
    });
    const parseValue = MjmlToJson(json);
    return parseValue;
  }
  const transform = (node) => {
    var _a;
    if (node.tagName === "parsererror") {
      throw new Error("Invalid content");
    }
    const attributes = {};
    node.getAttributeNames().forEach((name) => {
      attributes[name] = node.getAttribute(name);
    });
    const type = node.tagName.replace("mj-", "");
    if (!BlockManager.getBlockByType(type)) {
      if (!node.parentElement || node.parentElement.tagName !== "mj-text")
        throw new Error("Invalid content");
    }
    const block = {
      type,
      attributes,
      data: {
        value: {
          content: (_a = node.textContent) == null ? void 0 : _a.trim()
        }
      },
      children: [...node.children].filter((item) => item instanceof Element).map(transform)
    };
    switch (type) {
      case BasicType.TEXT:
        block.data.value.content = node.innerHTML;
        block.children = [];
    }
    return block;
  };
  return transform(root2);
}
function MjmlToJson(data) {
  if (isString(data))
    return parseXMLtoBlock(data);
  const transform = (item) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const attributes = item.attributes;
    switch (item.tagName) {
      case "mjml":
        const body = (_a = item.children) == null ? void 0 : _a.find((item2) => item2.tagName === "mj-body");
        const head = (_b = item.children) == null ? void 0 : _b.find((item2) => item2.tagName === "mj-head");
        const metaData = getMetaDataFromMjml(head);
        const fonts = ((_c = head == null ? void 0 : head.children) == null ? void 0 : _c.filter((child) => child.tagName === "mj-font").map((child) => ({
          name: child.attributes.name,
          href: child.attributes.href
        }))) || [];
        const mjAttributes = ((_e = (_d = head == null ? void 0 : head.children) == null ? void 0 : _d.find((item2) => item2.tagName === "mj-attributes")) == null ? void 0 : _e.children) || [];
        const headStyles = (_f = head == null ? void 0 : head.children) == null ? void 0 : _f.filter((item2) => item2.tagName === "mj-style").map((item2) => ({ content: item2.content, inline: item2.inline }));
        const headAttributes = [
          ...new Set(mjAttributes.filter((item2) => {
            const isFontFamily = item2.tagName === "mj-all" && item2.attributes["font-family"] === metaData["font-family"];
            const isTextColor = item2.tagName === "mj-text" && item2.attributes["color"] === metaData["text-color"];
            const isContentColor = ["mj-wrapper", "mj-section"].includes(item2.tagName) && item2.attributes["background-color"] === metaData["content-background-color"];
            return !isFontFamily && !isTextColor && !isContentColor;
          }).map((item2) => `<${item2.tagName} ${Object.keys(item2.attributes).map((key) => `${key}="${item2.attributes[key]}"`).join(" ")} />`))
        ].join("\n");
        const breakpoint = (_g = head == null ? void 0 : head.children) == null ? void 0 : _g.find((item2) => item2.tagName === "mj-breakpoint");
        return BlockManager.getBlockByType(BasicType.PAGE).create({
          attributes: body.attributes,
          children: (_h = body.children) == null ? void 0 : _h.map(transform),
          data: {
            value: __spreadValues({
              headAttributes,
              headStyles,
              fonts,
              breakpoint: breakpoint == null ? void 0 : breakpoint.attributes.breakpoint
            }, metaData)
          }
        });
      default:
        const tag = item.tagName.replace("mj-", "").toLowerCase();
        const block = BlockManager.getBlockByType(tag);
        if (!block) {
          throw new Error(`${tag} block no found `);
        }
        const payload = {
          type: block.type,
          attributes,
          data: {
            value: {}
          },
          children: []
        };
        if (item.content) {
          payload.data.value.content = item.content;
        }
        if (block.type === BasicType.CAROUSEL) {
          payload.data.value.images = ((_i = item.children) == null ? void 0 : _i.map((child) => {
            return child.attributes;
          })) || [];
          payload.children = [];
        } else if (block.type === BasicType.NAVBAR) {
          payload.data.value.links = ((_j = item.children) == null ? void 0 : _j.map((child) => {
            const navbarLinkData = __spreadProps(__spreadValues({
              color: "#1890ff",
              "font-size": "13px",
              target: "_blank",
              padding: "15px 10px"
            }, child.attributes), {
              content: child.content
            });
            formatPadding(navbarLinkData, "padding");
            return navbarLinkData;
          })) || [];
          payload.children = [];
        } else if (block.type === BasicType.SOCIAL) {
          payload.data.value.elements = ((_k = item.children) == null ? void 0 : _k.map((child) => {
            return __spreadProps(__spreadValues({}, child.attributes), {
              content: child.content
            });
          })) || [];
          payload.children = [];
        } else if (item.children) {
          payload.children = item.children.map(transform);
        }
        const blockData = block.create(payload);
        formatPadding(blockData.attributes, "padding");
        formatPadding(blockData.attributes, "inner-padding");
        return blockData;
    }
  };
  return transform(data);
}
function getMetaDataFromMjml(data) {
  var _a;
  const mjmlHtmlAttributes = (_a = data == null ? void 0 : data.children) == null ? void 0 : _a.filter((item) => item.tagName === "mj-html-attributes").map((item) => item.children).flat().filter((item) => item && item.attributes.class === "easy-email").reduce((obj, item) => {
    if (!item)
      return obj;
    const name = item.attributes["attribute-name"];
    const isMultipleAttributes = Boolean(item.attributes["multiple-attributes"]);
    obj[name] = isMultipleAttributes ? pickBy(__spreadProps(__spreadValues({}, item.attributes), {
      "attribute-name": void 0,
      "multiple-attributes": void 0,
      class: void 0
    }), identity) : item.attributes[name];
    return obj;
  }, {});
  return pickBy(mjmlHtmlAttributes, identity);
}
function formatPadding(attributes, attributeName) {
  const ele = document.createElement("div");
  Object.keys(attributes).forEach((key) => {
    var _a;
    if (new RegExp(`^${attributeName}`).test(key)) {
      const formatKey = (_a = new RegExp(`^${attributeName}(.*)`).exec(key)) == null ? void 0 : _a[0];
      if (formatKey) {
        ele.style[formatKey] = attributes[key];
        delete attributes[key];
      }
    }
  });
  const newPadding = [
    ele.style.paddingTop,
    ele.style.paddingRight,
    ele.style.paddingBottom,
    ele.style.paddingLeft
  ].filter(Boolean).join(" ");
  if (newPadding) {
    attributes[attributeName] = newPadding;
  }
}
function parseReactBlockToBlockData(node) {
  return JSON.parse(unescape(renderToStaticMarkup(node)));
}
function createBlockDataByType(type, payload) {
  const component = BlockManager.getBlockByType(type);
  if (component) {
    return component.create(payload);
  }
  throw new Error(`No match \`${type}\` block`);
}
let nanoid = (size = 21) => {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size));
  while (size--) {
    let byte = bytes[size] & 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += "_";
    } else {
      id += "-";
    }
  }
  return id;
};
function generateIterationTemplate(option, content) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Raw, null, `
        <!-- htmlmin:ignore -->
        {% for ${option.itemName} in ${option.dataSource} ${option.limit ? `limit:${option.limit}` : ""} %}
        <!-- htmlmin:ignore -->
        `), content, /* @__PURE__ */ React.createElement(Raw, null, " <!-- htmlmin:ignore -->{% endfor %}  <!-- htmlmin:ignore -->"));
}
function generateConditionTemplate(option, content) {
  const { symbol, groups } = option;
  const generateExpression = (condition) => {
    if (condition.operator === Operator.TRUTHY) {
      return condition.left;
    }
    if (condition.operator === Operator.FALSY) {
      return condition.left + " == nil";
    }
    return condition.left + " " + condition.operator + " " + (isNumber(condition.right) ? condition.right : `"${condition.right}"`);
  };
  const uuid = nanoid(5);
  const variables = groups.map((_, index2) => `con_${index2}_${uuid}`);
  const assignExpression = groups.map((item, index2) => {
    return `{% assign ${variables[index2]} = ${item.groups.map(generateExpression).join(` ${item.symbol} `)} %}`;
  }).join("\n");
  const conditionExpression = variables.join(` ${symbol} `);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Raw, null, `
        <!-- htmlmin:ignore -->
        ${assignExpression}
        {% if ${conditionExpression} %}
        <!-- htmlmin:ignore -->
        `), content, /* @__PURE__ */ React.createElement(Raw, null, `
        <!-- htmlmin:ignore -->
        {% endif %}
        <!-- htmlmin:ignore -->
        `));
}
class TemplateEngineManager {
  static setTag(option) {
    this.tags[option.name] = option.templateGenerateFn;
  }
  static generateTagTemplate(name) {
    return this.tags[name];
  }
}
__publicField(TemplateEngineManager, "tags", {
  iteration: generateIterationTemplate,
  condition: generateConditionTemplate
});
function isAdvancedBlock(type) {
  return Object.values(AdvancedType).includes(type);
}
function getAdapterAttributesString(params) {
  const { data, idx } = params;
  const isTest = params.mode === "testing";
  const attributes = __spreadValues({}, data.attributes);
  const keepClassName = isTest ? params.keepClassName : false;
  if (isTest && idx) {
    attributes["css-class"] = classnames(attributes["css-class"], EMAIL_BLOCK_CLASS_NAME, getNodeIdxClassName(idx), getNodeTypeClassName(data.type));
  }
  if (keepClassName) {
    attributes["css-class"] = classnames(attributes["css-class"], getNodeTypeClassName(data.type));
  }
  let attributeStr = "";
  for (let key in attributes) {
    const keyName = key;
    const val = attributes[keyName];
    if (isString(val) && val) {
      const splitter = " ";
      attributeStr += `${key}="${val.replace(/"/gm, "")}"` + splitter;
    }
  }
  return attributeStr;
}
export { AdvancedType, BasicType, BlockManager, EMAIL_BLOCK_CLASS_NAME, I18nType, ImageManager, JsonToMjml, MERGE_TAG_CLASS_NAME, MjmlToJson, Operator, OperatorSymbol, TemplateEngineManager, advancedBlocks, ancestorOf, index as components, createBlock, createBlockDataByType, createCustomBlock, getAdapterAttributesString, getChildIdx, getIndexByIdx, getNodeIdxClassName, getNodeIdxFromClassName, getNodeTypeClassName, getNodeTypeFromClassName, getPageIdx, getParenRelativeByType, getParentByIdx, getParentByType, getParentIdx, getPreviewClassName, getSameParent, getSiblingIdx, getValidChildBlocks, getValueByIdx, isAdvancedBlock, isValidBlockData, mergeBlock, parseReactBlockToBlockData, standardBlocks };
//# sourceMappingURL=index.es.js.map
