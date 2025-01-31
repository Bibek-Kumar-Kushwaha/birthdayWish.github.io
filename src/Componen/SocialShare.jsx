import React from "react";
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";

const SocialShare = ({ url }) => {
  return (
    <div className="flex gap-4 mt-6">
      <WhatsappShareButton url={url} className="p-3 bg-green-500 rounded-full">
        WhatsApp
      </WhatsappShareButton>
      <FacebookShareButton url={url} className="p-3 bg-blue-600 rounded-full">
        Facebook
      </FacebookShareButton>
      <TwitterShareButton url={url} className="p-3 bg-sky-400 rounded-full">
        Twitter
      </TwitterShareButton>
    </div>
  );
};

export default SocialShare;
