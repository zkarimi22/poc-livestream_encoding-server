# poc-livestream_encoding-server

![Alt Text](https://previewpod.com/gifSample.gif)


- Using web-based technologies to capture a staged canvas on the browser for live streaming. 
- Captures canvas stream
- makes a socket connection to pass stream to server
- encodes stream for RTMP
- passes stream to an AWS Elemental MediaLive RTMP input, AWS transcodes and connects HLS output via MediaPackage
- MediaPackage output to Cloudfront CDN for distribution
- HLS players use Cloudfront CDN url for live stream 

# [See instructions here](https://github.com/zkarimi22/poc-livestream-with-CDN)
