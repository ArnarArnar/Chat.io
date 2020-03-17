import { CREATE_USER, GET_USER_LIST } from '../constants';

import socketService from '../../services/socketService';

export const addUser = userName => async dispatchEvent => {
  try {
    console.log('actions > addUser', userName);
    const addedUser = socketService.addUser(userName);
    dispatchEvent(addUserSuccess({ addedUser }));
  } catch (err) {
    throw new Error(err);
  }
  console.log('actions > addUser', userName);
};

const addUserSuccess = userName => {
  return {
    type: CREATE_USER,
    payload: userName,
  };
};

export const getUserList = () => dispatchEvent => {
  try {
    const allUsers = socketService.getUserList();
    dispatchEvent(getUserListSuccess(allUsers));
  } catch (err) {
    throw new Error(err);
  }
};

const getUserListSuccess = bosses => ({
  type: GET_USER_LIST,
  payload: bosses,
});

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
