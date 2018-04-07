class SignupsController < ApplicationController
  def new
    @user = User.create(email: params["email"], password: params["password"])
    render json: {id: @user.id}
  end

  def login
    @user = User.find_by(email: params["email"])
    render json: {id: @user.id}
  end

  def find
  end
end
