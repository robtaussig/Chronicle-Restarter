class StaticPagesController < ApplicationController

  def root
    @user = current_user
    if @user
      gon.push({
        user: @user
      })
    end
  end

end
