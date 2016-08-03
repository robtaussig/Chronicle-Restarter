Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:new, :create, :show, :destroy]
    resource :session, only: [:create, :destroy]
    resources :projects
  end
end
