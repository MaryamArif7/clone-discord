/* @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.externals.push({
        //29.6 
        "utf-8-validate": "commonjs utf-8-validate",
        bufferutil: "commonjs bufferutil"
      });
  
      return config;
    },
    //7.6:uploadthing : added uploadthing.com in the domains
    images: {
      domains: [
        "uploadthing.com",
        "utfs.io"
      ]
    }
  }
  
  module.exports = nextConfig