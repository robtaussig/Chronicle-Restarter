class CreateApiUpdates < ActiveRecord::Migration
  def change
    create_table :api_updates do |t|
      t.integer :campaign_id, null: false
      t.string :body, null: false
      t.string :title, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
    add_index :api_updates, :campaign_id
  end
end
