module Api
  module V1
    class NodesController < ApplicationController

      def index
        render json: Node.all
      end

      def show
        render json: Node.find(params[:id])
      end

      # def create
      #   node = Node.new(params.require(:node).permit(:title,:body,:parent_id,:space_id))
      #   if node.save
      #     render json: {message: "Created node!", status: 200}
      #   else
      #     render json: {message: node.errors.full_messages, status: 500}
      #   end
      # end

    end
  end
end
