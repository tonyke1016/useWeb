import { defineStore, storeToRefs } from "pinia";

import { localStorageMsg, ME_USER_NAME } from "@/util/commonUtil";
import { useApiStore } from "@/store/api";

export const useChatStore = defineStore({
    id: "chat",
    state: () => ({
        messages: <any>[],
        msg: <any>"",
        replyMsg: <any>"",
        isReplyBox: <boolean>false,
        inputVal: <any>null,
        deleteBoolean: <boolean>false,
        deletePopUp: <boolean>false,
        deleteGroup: <any>[],
        chatRoomMsg: <any>null,
        pictures: <any>[],
        inputFunctionBoolean: <boolean>false,
        isUnableRead: <boolean>false,
        textPlugin: <any>"",
        showRecorderModal: <any>false,
        showStickerModal: <boolean>false,
        stickerGroupID: <number>1,
        stickerGroup: <any>[],
        stickerItems: <any>[],
        participantList: <any>[],
        msgParticipantList: <any>[],
        isOnline: <boolean>false,
    }),
    getters: {},
    actions: {
        // 回覆訊息
        replyMsgEvent(msg: any) {
            const findId = this.messages.find((text: any) => {
                return text.janusMsg.config.id === msg.janusMsg.config.id;
            });
            this.replyMsg = findId;
            this.isReplyBox = true;
            msg.janusMsg.config.msgFunctionStatus = false;
            this.inputVal.focus();
            this.inputFunctionBoolean = false;
        },
        // 關閉回訊視窗
        replyHide() {
            this.isReplyBox = false;
            this.replyMsg = "";
            this.inputVal.focus();
        },
        //刪除訊息提示
        deleteQuestion(msg: any) {
            this.deleteGroup = [];
            this.deleteBoolean = !this.deleteBoolean;
            msg.janusMsg.config.msgFunctionStatus = false;
        },
        //刪除訊息
        confirmDelete(eventKey: any) {
            this.messages = this.messages.filter((item: any) => {
                return !this.deleteGroup.includes(item.janusMsg.config.id);
            });
            localStorageMsg(this.messages, eventKey);
            this.deleteGroup = [];
            this.deleteBoolean = false;
            this.deletePopUp = false;
        },

        //獲取janus訊息
        getCompanyMsg(msgObj: any, eventKey: any) {
            console.log("janus 訊息:", msgObj);
            this.messages = JSON.parse(localStorage.getItem(`${eventKey}`) || "[]");
            const messagesParse: any = JSON.parse(msgObj.msg);
            if (messagesParse.janusMsg.sender === 0) {
                this.messages.push(messagesParse);
                localStorageMsg(this.messages, eventKey);
            }
            this.messages.forEach((element) => {
                element.janusMsg.config.isRead = true;
            });
            if (messagesParse.janusMsg.msgType === 6 || messagesParse.janusMsg.msgType === 7) {
                this.pictures.push(messagesParse);
                localStorage.setItem(`${eventKey}-pictures`, JSON.stringify(this.pictures));
            }
            console.log("this.messages:", this.messages);
        },
        // 開啟錄音視窗
        openRecorder() {
            this.showRecorderModal = true;
            this.inputFunctionBoolean = false;
            this.showStickerModal = false;
            //取得麥克風權限
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then(function (stream) {
                    console.log("You let me use your mic!");
                    stream.getTracks().forEach((track) => track.stop());
                })
                .catch(function (err) {
                    console.log("No mic for you !");
                });
        },
        //關閉錄音室窗
        closeRecorder() {
            this.showRecorderModal = false;
            this.inputFunctionBoolean = false;
            //取得麥克風權限
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then(function (stream) {
                    console.log("You let me use your mic!");
                    stream.getTracks().forEach((track) => track.stop());
                })
                .catch(function (err) {
                    console.log("No mic for you !");
                });
        },
        // 貼圖
        handleStickckerGroup(id: any) {
            console.log("id:", id);

            // api store
            const apiStore = useApiStore();
            const { stickerList } = storeToRefs(apiStore);
            this.stickerGroupID = id;
            const getlist = stickerList.value.find((item) => {
                return item.stickerPackID === this.stickerGroupID;
            });
            this.stickerGroup = id == 0 ? this.stickerItems : getlist;
        },
    },
});
