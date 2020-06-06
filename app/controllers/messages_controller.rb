class MessagesController < ApplicationController
  def index
  end

  def create
    if Message.create(message_params)
      redirect_to message_path
    else
      render :index
    end
  end

  private
    def message_params
      params.require(:message).permit(:content, :image).merge(group_id: params[:id], user_id: current_user.id)
    end
end
