import React from 'react';
export interface TextStyleProps {
    variation?: 'strong' | 'subdued';
    size?: 'largest' | 'extraLarge' | 'large' | 'medium' | 'small' | 'smallest';
}
export declare const TextStyle: React.FC<TextStyleProps>;
