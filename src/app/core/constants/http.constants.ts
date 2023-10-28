const AUTH_LOGIN = "/api/auth/login",
  AUTH_REGISTER = "/api/auth/register",
  AUTH_SEND_RESET_PASSWORD_EMAIL = "/api/auth/send-reset-password-email/",
  AUTH_RESET_PASSWORD = "/api/auth/reset-password/",
  AUTH_GITHUB_AUTH_PAGE = "/api/auth/github/auth-page",
  AUTH_GITHUB_ACCESS_TOKEN = "/api/auth/github/get-access-token",
  AUTH_GITHUB_LOGIN = "/api/auth/github/get-user-details/",
  AUTH_GITHUB_UPDATE_EXISTING_USER = "/api/auth/github/update-existing-user/",
  AUTH_CHECK_UNIQUE_USERNAME = "/api/auth/unique-username/",
  AUTH_CHECK_UNIQUE_EMAIL = "/api/auth/unique-email/",
  AUTH_LOGOUT = "/api/auth/logout/",
  DASHBOARD_GET = "/api/dashboard/",
  EDUCATION_GET = "/api/education/",
  EDUCATION_CREATE = "/api/education/",
  EDUCATION_UPDATE = "/api/education/edit/",
  EDUCATION_BULK_UPDATE = "/api/education/bulk-edit/",
  EDUCATION_REMOVE = "/api/education/remove/",
  EDUCATION_GET_ITEM_DETAILS = "/api/education/get-details/",
  EMPLOYMENT_GET = "/api/employment/",
  EMPLOYMENT_CREATE = "/api/employment/",
  EMPLOYMENT_UPDATE = "/api/employment/edit/",
  EMPLOYMENT_BULK_UPDATE = "/api/employment/bulk-edit/",
  EMPLOYMENT_REMOVE = "/api/employment/remove/",
  PROJECTS_GET = "/api/projects/",
  PROJECTS_CREATE = "/api/projects/",
  PROJECTS_UPDATE = "/api/projects/edit/",
  PROJECTS_BULK_UPDATE = "/api/projects/bulk-edit/",
  PROJECTS_REMOVE = "/api/projects/remove/",
  PROFILE_GET = "/api/profile/",
  PROFILE_UPDATE = "/api/profile/",
  PROFILE_IMAGE_UPDATE = "/api/profile/profile-image-upload",
  PROFILE_COVER_IMAGE_UPDATE = "/api/profile/cover-image-upload",
  SETTINGS_GET = "/api/settings/",
  SETTINGS_UPDATE = "/api/settings/edit/",
  SETTINGS_UPDATE_EMAIL = "/api/settings/update-email/",
  SETTINGS_UPDATE_PASSWORD = "/api/settings/update-password/",
  SETTINGS_UPDATE_EXISTING_PASSWORD = "/api/settings/update-existing-password/",
  SETTINGS_DELETE_ACCOUNT = "/api/settings/delete-account/";

export const API: any = {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_SEND_RESET_PASSWORD_EMAIL,
  AUTH_RESET_PASSWORD,
  AUTH_GITHUB_AUTH_PAGE,
  AUTH_GITHUB_ACCESS_TOKEN,
  AUTH_GITHUB_LOGIN,
  AUTH_GITHUB_UPDATE_EXISTING_USER,
  AUTH_CHECK_UNIQUE_USERNAME,
  AUTH_CHECK_UNIQUE_EMAIL,
  AUTH_LOGOUT,
  DASHBOARD_GET,
  EDUCATION_GET,
  EDUCATION_CREATE,
  EDUCATION_UPDATE,
  EDUCATION_BULK_UPDATE,
  EDUCATION_REMOVE,
  EDUCATION_GET_ITEM_DETAILS,
  EMPLOYMENT_GET,
  EMPLOYMENT_CREATE,
  EMPLOYMENT_UPDATE,
  EMPLOYMENT_BULK_UPDATE,
  EMPLOYMENT_REMOVE,
  PROJECTS_GET,
  PROJECTS_CREATE,
  PROJECTS_UPDATE,
  PROJECTS_BULK_UPDATE,
  PROJECTS_REMOVE,
  PROFILE_GET,
  PROFILE_UPDATE,
  PROFILE_IMAGE_UPDATE,
  PROFILE_COVER_IMAGE_UPDATE,
  SETTINGS_GET,
  SETTINGS_UPDATE,
  SETTINGS_UPDATE_EMAIL,
  SETTINGS_UPDATE_PASSWORD,
  SETTINGS_UPDATE_EXISTING_PASSWORD,
  SETTINGS_DELETE_ACCOUNT,
};
