class CreateApiUsers < ActiveRecord::Migration
  def change
    create_table :api_users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :email
      t.string :pic_url
      t.string :home

      t.timestamps null: false
    end

    add_index :api_users, :username, unique: true
    add_index :api_users, :email

  end
end
