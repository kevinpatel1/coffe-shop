import {
  CHANGE_LAYOUT,
  CHANGE_SIDEBAR_THEME,
  CHANGE_LAYOUT_MODE,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_LAYOUT_POSITION,
  CHANGE_TOPBAR_THEME,
  CHANGE_SIDEBAR_SIZE_TYPE,
  CHANGE_SIDEBAR_VIEW,
  RESET_VALUE
} from './actionType';

//constants
import {
  layoutTypes,
  leftSidebarTypes,
  layoutModeTypes,
  layoutWidthTypes,
  layoutPositionTypes,
  topbarThemeTypes,
  leftsidbarSizeTypes,
  leftSidebarViewTypes
} from "../../Components/constants/layout";

const INIT_STATE = {
  layoutType: layoutTypes.HORIZONTAL,
  leftSidebarType: leftSidebarTypes.DARK,
  layoutModeType: layoutModeTypes.LIGHTMODE,
  layoutWidthType: layoutWidthTypes.FLUID,
  layoutPositionType: layoutPositionTypes.FIXED,
  topbarThemeType: topbarThemeTypes.LIGHT,
  leftsidbarSizeType: leftsidbarSizeTypes.SMALLHOVER,
  leftSidebarViewType: leftSidebarViewTypes.DEFAULT,
};

const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LAYOUT:
      return {
        ...state,
        layoutType: action.payload,
      };

    case CHANGE_LAYOUT_MODE:
      return {
        ...state,
        layoutModeType: action.payload,
      };

    case CHANGE_SIDEBAR_THEME:
      return {
        ...state,
        leftSidebarType: action.payload,
      };

    case CHANGE_LAYOUT_WIDTH:
      return {
        ...state,
        layoutWidthType: action.payload,
      };

    case CHANGE_LAYOUT_POSITION:
      return {
        ...state,
        layoutPositionType: action.payload,
      };

    case CHANGE_TOPBAR_THEME:
      return {
        ...state,
        topbarThemeType: action.payload,
      };

    case CHANGE_SIDEBAR_SIZE_TYPE:
      return {
        ...state,
        leftsidbarSizeType: action.payload,
      };

    case CHANGE_SIDEBAR_VIEW:
      return {
        ...state,
        leftSidebarViewType: action.payload,
      };


    case RESET_VALUE:
      return {
        ...state,
        resetValue: INIT_STATE,
      };

    default:
      return state;
  }
};

export default Layout;
