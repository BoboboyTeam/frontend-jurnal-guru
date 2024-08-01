import { createSelector } from "@reduxjs/toolkit";

const selectJurnalGuru = (state) => state.jurnalGuru;
const selectGuru = (state) => state.teacher;
const selectKelas = (state) => state.kelas;
const selectMapel = (state) => state.mapel;
const selectProfile = (state) => state.profile;

export const selectDataJurnalGuru = createSelector(
    [selectJurnalGuru],
    (jurnalGuru) => jurnalGuru.data
    );
export const selectLoadingJurnalGuru = createSelector(
    [selectJurnalGuru],
    (jurnalGuru) => jurnalGuru.loading
    );
export const selectErrorJurnalGuru = createSelector(
    [selectJurnalGuru],
    (jurnalGuru) => jurnalGuru.error
    );

export const selectDataGuru = createSelector(
    [selectGuru],
    (teacher) => teacher.data
    );
export const selectDataKelas = createSelector(
    [selectKelas],
    (kelas) => kelas.data
    );
export const selectDataMapel = createSelector(
    [selectMapel],
    (mapel) => mapel.data
    );
export const selectDataProfile = createSelector(
    [selectProfile],
    (profile) => profile.data
    );
export const selectRoleProfile = createSelector(
    [selectProfile],
    (profile) => profile.role
    );
