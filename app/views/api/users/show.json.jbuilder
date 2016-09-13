json.extract! @user, :id, :username, :email, :location, :website,
  :biography, :full_name, :verified, :verification_status

  if @user.image
    json.pic_url asset_path(@user.image.url)
  end

  json.projects @user.projects
  json.funded_projects @user.funded_projects
