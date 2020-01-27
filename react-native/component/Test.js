import React from 'react';
import { View, SafeAreaView, Button, StyleSheet,TextInput } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices,RTCSessionDescription } from 'react-native-webrtc';


export default class Test extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            localStream : null,
            remoteStream :  null,
            connection : null,
            userId : null,
            websocketUrl : 'ws://10.37.25.183:8000',
            token : "dummy",
            myPeerConnection : null
        } 

    }
    async componentDidMount() {
       //await this.getSocketConnection();
    }

     getSocketConnection = async () => {
       let connection = new WebSocket(this.state.websocketUrl + "/ws?id=" + this.state.userId + "&token=" + this.state.token);
        connection.onopen = (event) => {
            this.setState({connection:connection})
            connection.onmessage = (event) => {
                console.log("on message")
                const msg = JSON.parse(event.data)
                switch (msg.messageType) {
                    case "video-offer":
                        this.handleVideoOfferMsg(msg);
                        break;
                    default:
                        console.log("Unknown message received:");
                        console.log(msg);
                }
            }
            connection.onclose = (event) => {
                console.log("on close event,connection state: ", connection.readyState)
            }
        }
        

    }
    sendToServer = (msg) => {
        console.log("sendToServer")
        this.state.connection.send(JSON.stringify(msg))    
    }
    createPeerConnection = async () => {
        const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
        this.state.myPeerConnection = new RTCPeerConnection(configuration);
        this.state.myPeerConnection.ontrack
    }
     startLocalStream = async () => {
        const isFront = true;
        const devices = await mediaDevices.enumerateDevices();

        const facing = isFront ? 'front' : 'back';
        const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
        const facingMode = isFront ? 'user' : 'environment';
        const constraints = {
            audio: true,
            video: {
                mandatory: {
                    minWidth: 500, // Provide your own width, height and frame rate here
                    minHeight: 300,
                    minFrameRate: 30,
                },
                facingMode,
                optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
            },
        };
        const newStream = await mediaDevices.getUserMedia(constraints);
        this.setState({localStream : newStream})
        
       
    };

    startCall = async () => {
        console.log("startCall")
        await this.createPeerConnection()
        // AddTrack not supported yet, so have to use old school addStream instead
        // newStream.getTracks().forEach(track => myPeerConnection.addTrack(track, newStream));
        this.state.myPeerConnection.addStream(this.state.localStream);
        try {
            const offer = await this.state.myPeerConnection.createOffer();
            await this.state.myPeerConnection.setLocalDescription(offer);
            if(!this.state.connection){
                await this.getSocketConnection();
            }
            const msg = {
                senderId: this.state.userId,
                receiverId: "suri100",
                data: "video chat",
                date: new Date().toLocaleString(),
                messageType: "video-offer",
                sdp: this.state.myPeerConnection.localDescription
            }
            this.sendToServer(msg)

        } catch (err) {
            console.error(err);
        }

    };
    handleVideoOfferMsg = async(msg) => {
        const targetUsername = msg.senderId;
        console.log("Received video chat offer from " + targetUsername);
        if (!this.state.myPeerConnection) {
            await this.createPeerConnection();
        }
        let desc = new RTCSessionDescription(msg.sdp);
        if (this.state.myPeerConnection.signalingState != "stable") {
            console.log("  - But the signaling state isn't stable, so triggering rollback");
            await Promise.all([
                this.state.myPeerConnection.setLocalDescription({ type: "rollback" }),
                this.state.myPeerConnection.setRemoteDescription(desc)
            ]);
            return;
        } else {
            console.log("  - Setting remote description");
            await this.state.myPeerConnection.setRemoteDescription(desc);
        }
        if (!this.state.localStream) {
            await this.startLocalStream()
        }
        this.state.myPeerConnection.addStream(this.state.localStream);
        console.log("---> Creating and sending answer to caller");
        await this.state.myPeerConnection.setLocalDescription(await this.state.myPeerConnection.createAnswer());
        const acceptMsg = {
            senderId: this.state.userId,
            receiverId: targetUsername,
            data: "video chat",
            date: new Date().toLocaleString(),
            messageType: "video-answer",
            sdp: this.state.myPeerConnection.localDescription
        }

        this.sendToServer(acceptMsg)
    }

     closeStreams = () => {
        //setLocalStream();
        //setRemoteStream();
    }
    setUserId = (userId) => {
        this.state.userId = userId

    }
    render(){
    return (  
        <SafeAreaView style={styles.container}>
              <TextInput
                onChangeText={text => this.setUserId(text)}
            />
            <Button title="Connect to server" onPress={this.getSocketConnection} />
            {!this.state.localStream && <Button title="Click to start stream" onPress={this.startLocalStream} />}
            {this.state.localStream && <Button title="Click to start call" onPress={this.startCall} />}

            <View style={styles.rtcview}>
                {this.state.localStream && <RTCView style={styles.rtc} streamURL={this.state.localStream.toURL()} />}
            </View>
            <View style={styles.rtcview}>
                {this.state.remoteStream && <RTCView style={styles.rtc} streamURL={this.state.remoteStream.toURL()} />}
            </View>
            <Button title="Click to stop call" onPress={this.closeStreams} disabled={!this.state.remoteStream} />
        </SafeAreaView>
    );
}
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#313131',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        padding:20
    },
    text: {
        fontSize: 30,
    },
    rtcview: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
        width: '80%',
        backgroundColor: 'black',
    },
    rtc: {
        width: '80%',
        height: '100%',
    },
});