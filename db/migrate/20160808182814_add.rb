class Add < ActiveRecord::Migration
  def change
    add_column :api_users, :verification_status, :boolean, default: false
  end
end
