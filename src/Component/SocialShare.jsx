import React from "react";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

const SocialShare = ({ url }) => {
  return (
    <div className="flex gap-4 justify-center mt-4">
      <FacebookShareButton url={url} className="p-2 bg-blue-500 text-white rounded-md">
        Share on Facebook
      </FacebookShareButton>
      <TwitterShareButton url={url} className="p-2 bg-blue-400 text-white rounded-md">
        Share on Twitter
      </TwitterShareButton>
      <WhatsappShareButton url={url} className="p-2 bg-green-500 text-white rounded-md">
        Share on WhatsApp
      </WhatsappShareButton>
    </div>
  );
};

export default SocialShare;
