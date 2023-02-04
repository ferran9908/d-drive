
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Meme {

 string memeHash;

  function set(string memory _memeHash) public {
    memeHash = _memeHash;
  }

  uint public fileCount = 0;

  struct File {
    uint count;
    string id;
    string memeHash;
    string name;
    string ftype;
    string fsize;
    string lastViewedBy;
    string email;
  }

  mapping(uint => File) public files;

  event FileCreated(
    uint count,
    string id,
    string memeHash,
    string name,
    string ftype,
    string fsize,
    string lastViewedBy,
    string email
  );

  // event FileRead(
  //   uint id,
  //   File file,
  //   string uid
  // );

  function createFile(string memory _id,string memory _memeHash, string memory _name, string memory _ftype, string memory _fsize, string memory _lastViewedBy, string memory _email) public {
    fileCount ++;
    files[fileCount] = File(fileCount, _id, _memeHash, _name, _ftype, _fsize, _lastViewedBy, _email);
    emit FileCreated(fileCount, _id, _memeHash, _name, _ftype, _fsize, _lastViewedBy, _email);
  }

  function getHash(uint _id, string memory _uid, string memory _email) public returns (File memory){  
    files[_id].lastViewedBy = _uid;
    files[_id].email = _email;
    memeHash = files[_id].memeHash;
    // emit FileRead(_id, files[_id], _uid);
    return files[_id];
  }

  function get() public view returns (string memory) {
    return memeHash;
  }

  // function getAll() public view returns (File[] memory) {
  //   File[] memory tfiles = new File[](fileCount);
  //   for (uint i = 0; i < fileCount; i++) {
  //     File storage tfile = files[i];
  //     tfiles[i] = tfile;
  //   }
  //   return tfiles;
  // }

  function getAll() public view returns (File[] memory){
    File[] memory ret = new File[](fileCount+1);
    for (uint i = 1; i < fileCount+1; i++) {
        ret[i] = files[i];
    }
    return ret;
  }
}
