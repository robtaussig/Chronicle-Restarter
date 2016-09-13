json.extract! @user, :id, :username, :email, :location, :website,
  :biography, :full_name, :verified, :verification_status

  json.pic_url asset_path(@user.image.url)
  json.projects @user.projects
  json.funded_projects @user.funded_projects
