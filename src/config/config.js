const env = process.env.NODE_ENV || "development";
console.log(`"env" is ${env}`);
const SERVER_SITE = {
    develop: "https://t.talkod.im:443",
    production: "https://talkod.im",
};
const FILE_SITE = {
    develop: "https://t.talkod.im:8029",
    production: "https://talkod.im",
};
const JANUS_SITE = {
    develop: "https://t.talkod.im:8089",
    production: "https://talkod.im",
};

const setting = {
    development: {
        serverUrl: SERVER_SITE.develop,
        janusUrl: JANUS_SITE.develop,
        fileUrl: FILE_SITE.develop,
    },
    develop: {
        serverUrl: SERVER_SITE.develop,
        janusUrl: JANUS_SITE.develop,
        fileUrl: FILE_SITE.develop,
    },
    production: {
        serverUrl: SERVER_SITE.production,
        janusUrl: JANUS_SITE.production,
        fileUrl: FILE_SITE.production,
    },
};

export default setting[env];
