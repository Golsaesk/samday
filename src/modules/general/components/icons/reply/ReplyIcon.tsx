/* eslint-disable max-len */
import React from 'react';

export const ReplyIcon = ({
  title,
  color,
}: {
  title?: string;
  color?: string;
}) => (
  <svg viewBox="0 0 23.11 22.55"
    width="16"
    height="16"
    fill={color || '#717171'}
  >
    <title>{title || ''}</title>
    <path id="reply_FILL1_wght400_GRAD0_opsz24" d="M4.258,16.733a.82.82,0,0,0,.833-.833V13.4a2.49,2.49,0,0,1,2.5-2.5h7.667l-2.437,2.437a.765.765,0,0,0-.229.563.8.8,0,0,0,.25.583.857.857,0,0,0,1.167,0l3.833-3.833a.726.726,0,0,0,.177-.271.956.956,0,0,0,0-.625.726.726,0,0,0-.177-.271L13.987,5.629a.765.765,0,0,0-.562-.229.8.8,0,0,0-.583.25.857.857,0,0,0,0,1.167l2.417,2.417H7.592a4.018,4.018,0,0,0-2.948,1.218A4.018,4.018,0,0,0,3.425,13.4v2.5a.82.82,0,0,0,.833.833Z" transform="translate(-0.571 -1.234)" fill="#313131" />
    <rect id="Rectangle_3405" data-name="Rectangle 3405" width="20" height="20" fill="none" />
  </svg>

);

export default ReplyIcon;