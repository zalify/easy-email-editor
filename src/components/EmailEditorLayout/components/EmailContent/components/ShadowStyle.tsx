import React from 'react';

export function ShadowStyle() {
  return (
    <style>
      {`
      .mj-accordion-content {
        display: block !important;
      }

      .email-block {
        outline: 1px dashed rgba(170,170,170,0.7);
        outline-offset: -2px;
      }

      .block-hover {
        outline-offset: -1px;
        outline: 1px solid #3b97e3;
        background-color: rgba(255, 255, 255, 0.015);
        position:relative;
        overflow: hidden;
      }

      .block-hover:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        z-index: 1;
        outline: 10000px solid rgba(24, 144, 255, 0.1);
        outline-offset: -10000px -10000px;
      }


      .block-selected {
        position:relative;
        outline-offset: -2px;
        outline: 2px solid #3b97e3 !important;
      }

      .block-dragover {
        outline-offset: -2px;
        outline: 2px solid #D0021B !important;
      }

      .block-tangent {
        outline-offset: -2px;
        outline: 2px solid #F5A623 !important;
      }

      .node-type-page {
        min-height: 100%;
      }
      .node-type-group{
        min-height: 30px
      }
    `}
    </style>
  );
}