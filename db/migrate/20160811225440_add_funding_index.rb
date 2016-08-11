class AddFundingIndex < ActiveRecord::Migration
  def change
    add_index :api_fundings, :reward_id
  end
end
