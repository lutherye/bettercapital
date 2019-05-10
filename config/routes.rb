Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update] do 
      resources :transactions, only: [:index, :create, :destroy]
      resources :watchlists, only: [:index, :create, :destroy]
    end
    resource :session, only: [:create, :destroy]
  end
  root "static_pages#root"
end
