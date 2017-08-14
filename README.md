# Hapi Auth Example

> Add authentication using multiple providers through a single interface

I wanted to add authentication using multiple providers through a single interface. While this ended up being
simple I had a hard time finding these examples. Examples include Twitter, Facebook, and Google. 
I also had some other requirements:

 - Docker setup
 - Bitbucket pipeline support ( I know, this is on Github )
 - Styleguide (airbnb-base)

# Using

### Config

Uses [node config](https://github.com/lorenwest/node-config). The highlights are that you can use config/default.json
as the example config. I suggest that you only use json or yml files for config. Node config will allow .js files
but it's bad practice to commit your secrets. 

 - hardcode config that you don't care to expose in default
 - Create a local.json for development
   - This file is ignore so secrets are safe here
 - The custom-environment-variables.json lets you override "secrets" with environment variables

 ### Providers

 Google, Facebook, and Twitter are given as examples. You will need to create apps with each of these
 providers and put the secret and id for each service in your local config.

 To add or remove a provider look in ./auth folder and add/remove the provider settings in each file.

 ### Docker

 ![](https://cdn-images-1.medium.com/max/1600/1*XyJyNE4XquojVNX0uIHXZA.jpeg "")

 ---

This is my example. There are many like it, but this one is mine.

My example is my best friend. It is my life. I must master it as I must master my life.
Without me, my example is useless. Without my example, I am useless. I must use my example always. I must use my example better than others use examples that are not mine. I must use my example before others use it. I will…

My example and I know that what counts in development is not the bugs we fix, the length of our streak, nor the issues we open. We know that it is the commits that count. We will commit…

My example is human, even as I, because it is my life. Thus, I will learn it as a brother. I will learn its weaknesses, its strength, its parts, its accessories, its structure and its dependencies. I will keep my example clean and ready, even as I am clean and ready. We will become part of each other. We will…

Before God, I swear this creed. My example and I are the defenders of my industry. We are the masters of automation. We are the saviors of my industry.

So be it, until victory is ours and there is no enemy, but peace!