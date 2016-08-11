class CreateApiFundings < ActiveRecord::Migration
  def change
    create_table :api_fundings do |t|
      t.integer :reward_id

      t.timestamps null: false
    end
  end
end
