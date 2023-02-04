import { useState, useEffect } from "react";
import { loadBlockchainData, loadWeb3, convertToBuffer } from "./utils";
import { ipfs } from "./App";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { PageHeader, Button, Divider, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { StyledTable } from "./StyledTable";

function Home() {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const [file, setFile] = useState("");
  const [fileBuffer, setFileBuffer] = useState();
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("");
  const [list, setList] = useState([]);
  const [hash, setHash] = useState("");
  const [lastViewedBy, setLastViewedBy] = useState("");
  const [selectedIdx, setSelectedIdx] = useState();
  const [uploading, setUploading] = useState(false);
  const [doNotDo, setDoNotDo] = useState(false)

  useEffect(() => {
    setHash("");
  }, []);

  useEffect(() => console.log({ list }), [list]);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData(setAccount, setContract, setList, auth);
  }, []);

  useEffect(() => {
    if (file) {
      convertToBuffer(file, setFileBuffer);
    }
  }, [file]);

  useEffect(() => {
    console.log({ hash });
  }, [hash]);

  const setNewHash = async (idx, uid, email) => {
    try {
      setDoNotDo(false)
      await contract.methods.getHash(idx, uid, email).send({ from: account });
      return true;
    } catch (e) {
      console.log({ e: e.message });
      setDoNotDo(true)
      return false;
    }
  };
  const getHash = async () => {
    if (!doNotDo) {
      const requiredHash = await contract.methods.get().call();
      setHash(requiredHash);
      window.location.href = `https://ddrive.infura-ipfs.io/ipfs/${requiredHash}`;
    } else {
      alert('Rejected')
    }
  };

  const onSubmit = () => {
    ipfs.add(fileBuffer, (err, res) => {
      if (err) {
        return console.log({ err });
      }
        console.log({res})
      contract.methods
        .createFile(
          auth.uid,
          res[0].hash,
          file.name,
          file.type,
          file.size.toString(),
          auth.uid,
          auth.email
        )
        .send({ from: account })
        .then((res) => {
          console.log({ transactResp: res });
        })
        .catch((e) => console.log({ e }, "Error"));
    });
  };
  if (auth.isLoaded && auth.isEmpty) return <Redirect to="/"></Redirect>;
  const props = {
    name: "file",
    multiple: false,
    onRemove: (file) => {
      setFileBuffer();
      setFile();

      // this.setState(state => {
      //   const index = state.fileList.indexOf(file);
      //   const newFileList = state.fileList.slice();
      //   newFileList   .splice(index, 1);
      //   return {
      //     fileList: newFileList,
      //   };
      // });
    },
    beforeUpload: (file) => {
      // this.setState(state => ({
      //   fileList: [...state.fileList, file],
      // }));
      // return false;
      setFile(file);
    },
    //  fileList: [file],
  };

  return (
    <div>
      <PageHeader
        className="site-page-header"
        ghost={true}
        onBack={false}
        title="D-Drive"
        subTitle="Decentralized Data Storage System"
        extra={[
          <Button onClick={() => firebase.logout()} key="1" type="danger">
            Logout
          </Button>,
        ]}
      />

      <div style={{ padding: "4rem" }}>
        <Divider style={{ fontSize: "20px" }} orientation="left">
          Your Files
        </Divider>

        <div>
          <div style={{ display: "grid", placeItems: "center" }}>
            <StyledTable style={{ marginBottom: "20px" }}>
              {list &&
                list.map((ele, idx) => {
                  if (ele[3] !== "" && ele[1] === auth.uid)
                    return (
                      <tr
                        className="file"
                        style={{
                          background: idx + 1 === selectedIdx ? "#E8F0FE" : "",
                          height: "40px",
                          cursor: "pointer",
                        }}
                        key={ele[0]}
                        onClick={async () => {
                          setLastViewedBy(ele[7]);
                          setSelectedIdx(idx + 1);
                          await setNewHash(ele[0], auth.uid, auth.email);
                        }}
                      >
                        <td style={{ color: "#0284C7" }}>{ele[3]}</td>
                        <td style={{ color: "black" }}>
                          Last Viewed By - {ele[7]}
                        </td>
                      </tr>
                    );
                })}
            </StyledTable>
            {/* {list &&
            list.map((ele, idx) => {
              if (ele[3] !== "" && ele[1] === auth.uid)
                return (
                  <div
                    style={{
                      borderRadius: "14px",
                      margin: "1rem",
                      padding: "1rem",
                      minHeight: "100px",
                      minWidth: "100px",
                      background: "white",
                      color: "black",
                      wordWrap: "break-word",
                      border: idx + 1 === selectedIdx ? "2px solid red" : "",
                    }}
                    
                    key={ele[0]}
                    onClick={async () => {
                      setLastViewedBy(ele[7]);
                      setSelectedIdx(idx + 1);
                      await setNewHash(ele[0], auth.uid, auth.email);
                    }}
                  >
                    <p>{ele[3]}</p>
                  </div>
                );
            })} */}

            {/* <List
            size="large"
            header={null}
            footer={null}
            bordered
            dataSource={list}
            renderItem={item => item[3] !== "" && item[1] === auth.uid ? <List.Item>{item[3]}</List.Item>: null}
          /> */}

            {/* <input
              style={{ fontSize: "20px" }}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            /> */}
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <Button
              type="primary"
              onClick={onSubmit}
              disabled={!fileBuffer}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
              {uploading ? "Uploading" : "Start Upload"}
            </Button>
            {selectedIdx && (
              <Button
                type="primary"
                style={{ marginTop: "10px" }}
                onClick={getHash}
              >
                Take Me to Selected File
              </Button>
            )}
            {/* {fileBuffer && (
              <input
                type="button"
                style={{ fontSize: "20px" }}
                value="Submit"
                onClick={onSubmit}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
