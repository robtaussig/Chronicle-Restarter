json.extract! @user, :id, :username, :email, :location, :website, :pic_url,
  :biography, :full_name, :verified, :verification_status

  json.projects @user.projects
  json.funded_projects @user.funded_projects
