let videoHash;
let codeHash;
let coverHash;
let readmeHash;
let folder_cid;
document.addEventListener("DOMContentLoaded", async () => {
  let account = await rarepress.init({ host: "https://rinkeby.rarepress.org/v0" })
  document.querySelector("#refresh").addEventListener("click", async (e) => {
    var sourcefolder_cid = "QmYDbsjQuJNE7kmEVw3EN9sgAZ5Ci2zFfG3QuDbsZLjuPD";
    videoHash = await rarepress.add("https://gateway.pinata.cloud/ipfs/" + sourcefolder_cid + "/video.mp4");
    codeHash = await rarepress.add("https://gateway.pinata.cloud/ipfs/" + sourcefolder_cid + "/code.js");
    coverHash = await rarepress.add("https://gateway.pinata.cloud/ipfs/" + sourcefolder_cid + "/cover.gif");
    readmeHash = await rarepress.add("https://gateway.pinata.cloud/ipfs/" + sourcefolder_cid + "/readme.txt")
    let mapping = {
      "video.mp4": videoHash,
      "code.js": codeHash,
      "cover.gif": coverHash,
      "readme.txt": readmeHash
    }
    folder_cid = await rarepress.folder(mapping);

    //console.log(imageHash);
    //document.querySelector("img").setAttribute("src", "https://rarepress.org/ipfs/" + imageHash);
    document.querySelector("video").setAttribute("src", "https://rinkeby.rarepress.org/ipfs/" + folder_cid + "/video.mp4");
    document.querySelector("#videoHash").setAttribute("href", "https://rinkeby.rarepress.org/ipfs/" + folder_cid + "/video.mp4");
    document.querySelector("#videoHash").innerHTML = ("View Video");
    document.querySelector("#codeHash").setAttribute("href", "https://rinkeby.rarepress.org/ipfs/" + folder_cid + "/code.js");
    document.querySelector("#codeHash").innerHTML = ("View Code");
  })
  document.querySelector("#mint").addEventListener("click", async (e) => {
    if (videoHash && codeHash) {
      let token = await rarepress.create({
        metadata: {
          name: "Strange Vibrations",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "/ipfs/" + folder_cid + "/cover.gif",
          animation_url: "/ipfs/" + folder_cid + "/video.mp4",
          attributes: [
            { trait_type: "Link", value: "https://artofbabel.xyz/sketch?art_id=4"},
            { trait_type: "Artist", value: "Roni Kaufman"},
            { trait_type: "Curated By", value: "Art Of Babel" },
            { trait_type: "Art ID", value: "4" },
            { trait_type: "IPFS CID", value: folder_cid},  
            { trait_type: "About", value: "This is a generative art NFT. Visit the URL in the Link field to view the real-time rendering of the NFT."}, 
            { trait_type: "Platform", value: "p5.js" },
            { trait_type: "Interactive", value: "No" },
            { trait_type: "License", value: "Demo License v1.0" },
            { trait_type: "Date", value: new Date().toUTCString() }
          ]
        }
        //royalties: [{
        //  account: account,
        //  value: 2000
        //}]
      })

      document.querySelector("#minted").setAttribute("href", "https://rinkeby.rarible.com/token/" + token.id);
      document.querySelector("#minted").innerHTML = ("View on Rarible");
    }
  })
})