import {
  CREATE_USER,
  GET_USER_LIST,
  GET_ROOM_LIST,
  JOIN_ROOM,
} from '../constants';

import socketService from '../../services/socketService';

export const addUser = userName => async dispatchEvent => {
  try {
    console.log('actions > addUser: ', userName);
    const successfullyAddedUser = await socketService.addUser(userName);
    console.log('Successfull add', successfullyAddedUser);
    if (successfullyAddedUser) {
      dispatchEvent(addUserSuccess({ userName }));
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

const addUserSuccess = userName => {
  return {
    type: CREATE_USER,
    payload: userName,
  };
};

export const getUserList = () => async dispatchEvent => {
  try {
    console.log('actions > getUserList: before');
    const allUsers = await socketService.getUserList();
    console.log('actions > getUserList: after', allUsers);
    dispatchEvent(getUserListSuccess(allUsers));
  } catch (err) {
    throw new Error(err);
  }
};

const getUserListSuccess = userList => ({
  type: GET_USER_LIST,
  payload: userList,
});

export const getRoomList = () => async dispatchEvent => {
  try {
    console.log('actions > getRoomList');
    const allRooms = await socketService.getRoomList();
    console.log('actions > getRoomList: ', allRooms);
    dispatchEvent(getRoomListSuccess(allRooms));
  } catch (err) {
    throw new Error(err);
  }
};

const getRoomListSuccess = roomList => ({
  type: GET_ROOM_LIST,
  payload: roomList,
});

export const joinRoom = roomName => async dispatchEvent => {
  try {
    console.log('actions > joinRoom: ', roomName);
    const addedUser = socketService.joinRoom(roomName);
    dispatchEvent(joinRoomSuccess({ addedUser }));
  } catch (err) {
    throw new Error(err);
  }
};

const joinRoomSuccess = roomName => {
  return {
    type: JOIN_ROOM,
    payload: roomName,
  };
};

// import {
//   GET_BOSSES,
//   CREATE_BOSS,
//   GET_BOSS_BY_ID,
//   DELETE_BOSS
// } from "../constants";
// import bossService from "../../services/bossService";

// export const getAllBosses = () => async dispatchEvent => {
//   try {
//     const allBosses = await bossService.getAllBosses();
//     dispatchEvent(getAllBossesSuccess(allBosses));
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// const getAllBossesSuccess = bosses => ({
//   type: GET_BOSSES,
//   payload: bosses
// });

// export const getBossById = id => async dispatchEvent => {
//   try {
//     const bossById = await bossService.getBossById(id);
//     dispatchEvent(getBossByIdSuccess(bossById));
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// const getBossByIdSuccess = bossById => ({
//   type: GET_BOSS_BY_ID,
//   payload: bossById
// });

// export const createBoss = (name, description, url) => async dispatchEvent => {
//   try {
//     bossService.createBoss({
//       name,
//       description,
//       img: url
//     });
//     dispatchEvent(createBossSuccess({ name, description, img: url }));
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const createBossSuccess = (name, description, url) => {
//   return {
//     type: CREATE_BOSS,
//     payload: { name, description, url }
//   };
// };

// export const deleteBoss = id => async dispatchEvent => {
//   try {
//     bossService.deleteBoss(id);
//     dispatchEvent(deleteBossSuccess(id));
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const deleteBossSuccess = id => {
//   return {
//     type: DELETE_BOSS,
//     payload: id
//   };
// };
