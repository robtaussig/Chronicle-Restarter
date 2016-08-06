class CreateApiRewards < ActiveRecord::Migration
  def change
    create_table :api_rewards do |t|

      t.timestamps null: false
    end
  end
end
