Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'news#index'

  resources :news, except: [:destroy, :edit, :update]
  resources :comment, only: [:create]
end
